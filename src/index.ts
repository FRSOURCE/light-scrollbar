import "./index.scss";

// TODO: increase dragging area for y, e.g 5px to left
// TODO: intersection of x/y scrollbars in corner should be excluded
// TODO: add rail
// TODO: min height should be fixed e.g
// TODO: sub pixel diff on min 10% scrollbar
// TODO: when  paginated list recalculate grab

type config = {
  scrollBarYWidth: number;
  scrollBarXHeight: number;
  className: string;
  enableFocusPrevent: boolean;
};
const addEventListener = "addEventListener";
function wrap(el: HTMLElement, wrapper: HTMLElement) {
  el?.parentNode?.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
const unwrap = (el: Element) => {
  el.replaceWith(el.children[0]);
};
export const attach = (
  containerElement: HTMLElement,
  config: config = {
    scrollBarYWidth: 6,
    scrollBarXHeight: 6,
    className: "light-scrollbar",
    enableFocusPrevent: true,
  }
) => {
  if (!containerElement) return;
  const wrapper = document.createElement("div");
  containerElement.classList.add(config.className);
  wrapper.classList.add(`${config.className}-wrapper`);
  wrap(containerElement, wrapper);
  wrapper.style.setProperty(
    "--light-scrollbar-y-width",
    `${config.scrollBarYWidth}px`
  );
  wrapper.style.setProperty(
    "--light-scrollbar-x-height",
    `${config.scrollBarXHeight}px`
  );
  wrapper.setAttribute("tabindex", "-1");

  let containerRect = containerElement.getBoundingClientRect();
  const data = {
    mouse: {
      x: 0,
      y: 0,
      isHold: false,
    },
    minLongPercent: 10,
    container: {
      width: 0,
      height: 0,
    },
    content: {
      width: 0,
      height: 0,
    },
    rail: {
      x: {
        isHovered: false,
        isStartingPointHover: false,
      },
      y: {
        isHovered: false,
        isStartingPointHover: false,
      },
    },
    scrollbar: {
      x: {
        isStartingPointHover: false,
        isHovered: false,
        isGrabbed: false,
        dragDiff: 0,
        gap: {
          toContent: {
            percent: 0,
            pixel: 0,
          },
          toContainer: {
            pixel: 0,
          },
        },
        long: {
          percent: 0,
          pixel: 0,
          realPercent: 0,
        },
        short: 0,
      },
      y: {
        isStartingPointHover: false,
        isHovered: false,
        isGrabbed: false,
        dragDiff: 0,
        gap: {
          toContent: {
            percent: 0,
            pixel: 0,
          },
          toContainer: {
            pixel: 0,
          },
        },
        short: 0,
        long: {
          percent: 0,
          pixel: 0,
          realPercent: 0,
        },
      },
    },
  };

  const updateMousePosition = (e: MouseEvent) => {
    data.mouse.x = e.clientX - containerRect.left - 1;
    data.mouse.y = e.clientY - containerRect.top - 2; //Browser render wrong position of mouse
  };

  const hoverScrollbar = () => {
    (["x", "y"] as ("x" | "y")[]).forEach((dir) => {
      const reverse = dir === "y" ? "x" : "y";
      const scrollbarWidthOrHeight =
        dir === "y" ? "scrollBarYWidth" : "scrollBarXHeight";
      const widthOrHeight = dir === "y" ? "width" : "height";

      data.scrollbar[dir].isHovered =
        data.mouse[reverse] <= data.container[widthOrHeight] &&
        data.mouse[reverse] >=
          data.container[widthOrHeight] - config[scrollbarWidthOrHeight] &&
        data.mouse[dir] >= data.scrollbar[dir].gap.toContainer.pixel &&
        data.mouse[dir] <=
          data.scrollbar[dir].gap.toContainer.pixel +
            data.scrollbar[dir].long.pixel;

      if (data.scrollbar[dir].isStartingPointHover) {
        data.scrollbar[dir].isStartingPointHover = true;
      } else {
        data.scrollbar[dir].isStartingPointHover =
          data.scrollbar[dir].isHovered;
      }
      wrapper.classList.toggle(
        `hover-${dir}`,
        data.scrollbar[dir].isStartingPointHover
      );
    });
  };

  const calculateHeightOfScrollbars = () => {
    data.container.height = containerElement.clientHeight;
    data.container.width = containerElement.clientWidth;
    data.content.height = containerElement.scrollHeight;
    data.content.width = containerElement.scrollWidth;

    (["x", "y"] as ("x" | "y")[]).forEach((dir) => {
      const long = dir === "y" ? "height" : "width";
      data.scrollbar[dir].long.realPercent =
        (data.container[long] / data.content[long]) * 100;
      const realPerc = data.scrollbar[dir].long.realPercent;
      data.scrollbar[dir].long.percent =
        realPerc >= data.minLongPercent ? realPerc : data.minLongPercent;
      data.scrollbar[dir].long.pixel =
        (data.scrollbar[dir].long.percent / 100) * data.container[long];

      const perc = data.scrollbar[dir].long.percent;
      wrapper.style.setProperty(
        `--light-scrollbar-${dir}-${long}`,
        `${perc >= 100 ? 0 : perc}%`
      );
    });
  };

  const calculateTopOfScrollbar = (e?: Event) => {
    (["x", "y"] as ("x" | "y")[]).forEach((dir) => {
      const leftOrTop = dir === "y" ? "scrollTop" : "scrollLeft";
      const long = dir === "y" ? "height" : "width";

      const scrollTopLeft =
        (e?.target as HTMLElement)?.[leftOrTop] || containerElement[leftOrTop];

      let diffPercent = 0;
      let diffPixels = 0;
      const isScrollbarTooSmall =
        data.scrollbar[dir].long.realPercent <= data.minLongPercent;
      if (isScrollbarTooSmall) {
        diffPercent =
          data.minLongPercent - data.scrollbar[dir].long.realPercent;
        diffPixels = (data.container[long] * diffPercent) / 100;
      }
      data.scrollbar[dir].gap.toContent.percent =
        scrollTopLeft / data.content[long];
      data.scrollbar[dir].gap.toContainer.pixel =
        ((scrollTopLeft + data.container[long] - diffPixels) /
          data.content[long]) *
          (data.container[long] - diffPixels) -
        (data.scrollbar[dir].long.pixel - diffPixels);

      const isTop = dir === "y" ? "top" : "left";
      wrapper.style.setProperty(
        `--light-scrollbar-${dir}-${isTop}`,
        `${data.scrollbar[dir].gap.toContainer.pixel}px`
      );
    });
  };

  const scrollOnDrag = (event: MouseEvent, prevent = false) => {
    (["x", "y"] as ("x" | "y")[]).forEach((dir) => {
      const percWidthOrHeight = dir === "y" ? "height" : "width";

      if (data.rail[dir].isStartingPointHover) {
        data.rail[dir].isStartingPointHover = true;
      } else {
        //2 condifition extract to method same in hover
        data.rail[dir].isStartingPointHover = data.rail[dir].isHovered;
      }

      if (data.rail[dir].isStartingPointHover) {
        prevent && event.preventDefault();

        if (data.scrollbar[dir].isGrabbed) {
          data.scrollbar[dir].isGrabbed = true;
        } else {
          data.scrollbar[dir].isGrabbed = data.scrollbar[dir].isHovered;
          if (data.scrollbar[dir].isGrabbed) {
            data.scrollbar[dir].dragDiff =
              data.scrollbar[dir].gap.toContainer.pixel - data.mouse[dir];
          } else {
            data.scrollbar[dir].dragDiff = -data.scrollbar[dir].long.pixel / 2;
          }
        }

        wrapper.classList.toggle(
          `active-${dir}`,
          data.scrollbar[dir].isGrabbed
        );

        const perc =
          (data.mouse[dir] + data.scrollbar[dir].dragDiff) /
          data.container[percWidthOrHeight];
        data.scrollbar[dir].gap.toContent.pixel =
          data.content[percWidthOrHeight] * perc;
        const leftOrTop = dir === "y" ? "scrollTop" : "scrollLeft";
        containerElement[leftOrTop] = data.scrollbar[dir].gap.toContent.pixel;
      }
    });
  };

  const calculateScrollbars = () => {
    calculateHeightOfScrollbars();
    calculateTopOfScrollbar();
  };

  const mouseDownHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    data.mouse.isHold = true;
    hoverScrollbar();
  };
  window[addEventListener]("mousedown", mouseDownHandler, { passive: true });
  const mouseUpHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    data.mouse.isHold = false;
    data.rail.y.isStartingPointHover = false;
    data.rail.x.isStartingPointHover = false;
    data.scrollbar.y.isStartingPointHover = false;
    data.scrollbar.x.isStartingPointHover = false;
    data.scrollbar.y.isGrabbed = false;
    data.scrollbar.x.isGrabbed = false;
    wrapper.classList.remove("active-x");
    wrapper.classList.remove("active-y");

    hoverScrollbar();
  };
  window[addEventListener]("mouseup", mouseUpHandler, { passive: true });

  const mouseMoveHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    containerRect = containerElement.getBoundingClientRect();

    if (data.mouse.isHold) {
      scrollOnDrag(e);
      containerElement.classList.add("no-smooth");
    } else {
      data.scrollbar.y.isStartingPointHover = false;
      data.scrollbar.x.isStartingPointHover = false;
      containerElement.classList.remove("no-smooth");
    }
    hoverScrollbar();
  };
  window[addEventListener]("mousemove", mouseMoveHandler, { passive: true });

  const onHoverRails = () => {
    (["x", "y"] as ("x" | "y")[]).forEach((dir) => {
      const reverse = dir === "y" ? "x" : "y";
      const scrollbarWidthOrHeight =
        dir === "y" ? "scrollBarYWidth" : "scrollBarXHeight";
      const widthOrHeight = dir === "y" ? "width" : "height";
      const percWidthOrHeight = dir === "y" ? "height" : "width";

      data.rail[dir].isHovered =
        data.mouse[reverse] <= data.container[widthOrHeight] &&
        data.mouse[reverse] >=
          data.container[widthOrHeight] - config[scrollbarWidthOrHeight] &&
        data.mouse[dir] < data.container[percWidthOrHeight] &&
        data.mouse[dir] > 0;
    });
  };

  const containerMouseMoveHandler = () => {
    onHoverRails();
    calculateScrollbars();
  };
  wrapper.addEventListener("mousemove", containerMouseMoveHandler, {
    passive: true,
  });

  const clickHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    scrollOnDrag(e, true);
  };
  wrapper.addEventListener("click", clickHandler);

  const focusHandler = (e: Event) => {
    if (!config.enableFocusPrevent) return;
    if (data.rail.x.isHovered || data.rail.y.isHovered) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  };
  wrapper.addEventListener("focus", focusHandler);

  const scrollHandler = (e: Event) => calculateTopOfScrollbar(e);
  containerElement.addEventListener("scroll", scrollHandler, { passive: true });

  const resizeObserver = new ResizeObserver(calculateScrollbars);
  resizeObserver.observe(containerElement);
  const observer = new MutationObserver(calculateScrollbars);
  observer.observe(containerElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  const detach = () => {
    resizeObserver.disconnect();
    observer.disconnect();
    containerElement.removeEventListener("scroll", scrollHandler);
    containerElement.removeEventListener("click", clickHandler);
    containerElement.removeEventListener(
      "mousemove",
      containerMouseMoveHandler
    );
    wrapper.removeEventListener("focus", focusHandler);
    window.removeEventListener("mousedown", mouseDownHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
    window.removeEventListener("mousemove", mouseMoveHandler);
    unwrap(wrapper);
    containerElement.classList.remove(config.className);
  };

  return {
    detach,
  };
};
