import "./index.scss";

// TODO: increase dragging area for y, e.g 5px to left
// TODO: intersection of x/y scrollbars in corner should be excluded
// TODO: add rail
// TODO: min height should be fixed e.g 30px? maybe prop and possibility to use px and %?
// TODO: sub pixel diff on min 10% scrollbar
// TODO: when  paginated list recalculate grab
// TODO: increase bar once hovered
// TODO: wrapper inside/outside their own wrapper element
// TODO: offset to edges
// TODO: show only on hover
type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type config = {
  bar?: {
    y: {
      width: number;
      offset: [number, number];
    };
    x: {
      height: number;
      offset: [number, number];
    };
  };
  className?: string;
  enableFocusPrevent?: boolean;
};
type Axis = "x" | "y";
type Dimension = "height" | "width";

const addEventListener = "addEventListener";
function wrap(el: HTMLElement, wrapper: HTMLElement) {
  el?.parentNode?.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
const unwrap = (el: Element) => {
  el.replaceWith(el.children[0]);
};
const defaultName = "light-scrollbar";

//UTILS
const isDirY = (dir: Axis) => dir === "y";
const reverseDir = (dir: Axis) => (isDirY(dir) ? "x" : "y");
const isHeightOrWidth = (is: boolean) => (is ? "height" : "width");
const isLeftOrTop = (dir: Axis) => (isDirY(dir) ? "scrollTop" : "scrollLeft");
const dimensionLong = (dir: Axis) => isHeightOrWidth(isDirY(dir));
//when direction 'y', dimension long is 'height'
const dimensionShort = (dir: Axis) => isHeightOrWidth(!isDirY(dir));
//when direction 'y', dimension short is 'width'
const scrollbarShort = (dir: Axis, internalConfig: Required<config>) =>
  isDirY(dir) ? internalConfig.bar.y.width : internalConfig.bar.x.height;

type DoActionForBothAxis = {
  dir: Axis;
  isDirY: boolean;
  isLeftOrTop: "scrollTop" | "scrollLeft";
  reverseDir: Axis;
  dimensionLong: Dimension;
  dimensionShort: Dimension;
  scrollbarShort: number;
};
const doActionForBothAxis = (
  internalConfig: Required<config>,
  callback: (callbackData: DoActionForBothAxis) => void
) => {
  (["x", "y"] as Axis[]).forEach((dir) => {
    callback({
      dir,
      isDirY: isDirY(dir),
      isLeftOrTop: isLeftOrTop(dir),
      reverseDir: reverseDir(dir),
      dimensionLong: dimensionLong(dir),
      dimensionShort: dimensionShort(dir),
      scrollbarShort: scrollbarShort(dir, internalConfig),
    });
  });
};

const defaultConfig = {
  bar: {
    y: {
      width: 6,
      offset: [0, 0] as [number, number],
    },
    x: {
      height: 6,
      offset: [0, 0] as [number, number],
    },
  },
  className: defaultName,
  enableFocusPrevent: true,
};

const setupWidthAndHeightForScrollbars = (internalConfig: Required<config>, wrapper: HTMLElement) => {
  doActionForBothAxis(internalConfig, ({ dir, dimensionShort, scrollbarShort }) => {
    wrapper.style.setProperty(`--${defaultName}-${dir}-${dimensionShort}`, `${scrollbarShort}px`);
  });
};

const deepMergeConfig = (defaultConfig: Required<config>, config: config) => {
  return {
    ...defaultConfig,
    ...config,
    bar: {
      y: { ...defaultConfig.bar.y, ...config?.bar?.y },
      x: { ...defaultConfig.bar.x, ...config?.bar?.x },
    },
  };
};
//replace-this-start
export const attach = (containerElement: HTMLElement, config: config = {}) => {
  if (!containerElement) return;
  const internalConfig = deepMergeConfig(defaultConfig, config);
  const wrapper = document.createElement("div");
  containerElement.classList.add(internalConfig.className);
  wrapper.classList.add(`${internalConfig.className}-wrapper`);
  wrapper.setAttribute("tabindex", "-1");
  wrap(containerElement, wrapper);

  setupWidthAndHeightForScrollbars(internalConfig, wrapper);

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
    data.mouse.x = e.clientX - containerRect.left;
    data.mouse.y = e.clientY - containerRect.top; //Browser render wrong position of mouse
  };

  const updateContainerDimensions = () => {
    data.container.height = containerElement.clientHeight;
    data.container.width = containerElement.clientWidth;
    data.content.height = containerElement.scrollHeight;
    data.content.width = containerElement.scrollWidth;
  };

  type IsRailHoveredParameters = RequireField<
    Partial<DoActionForBothAxis>,
    "reverseDir" | "dimensionShort" | "scrollbarShort"
  >;
  const isRailHoveredShort = ({ reverseDir, dimensionShort, scrollbarShort }: IsRailHoveredParameters) => {
    return (
      data.mouse[reverseDir] < data.container[dimensionShort] &&
      data.mouse[reverseDir] >= data.container[dimensionShort] - scrollbarShort - 10
    );
  };

  const hoverScrollbar = ({ dir, reverseDir, scrollbarShort, dimensionShort }: DoActionForBothAxis) => {
    data.scrollbar[dir].isHovered =
      isRailHoveredShort({ reverseDir, scrollbarShort, dimensionShort }) &&
      data.mouse[dir] >= data.scrollbar[dir].gap.toContainer.pixel &&
      data.mouse[dir] <= data.scrollbar[dir].gap.toContainer.pixel + data.scrollbar[dir].long.pixel;

    if (data.scrollbar[dir].isStartingPointHover) {
      data.scrollbar[dir].isStartingPointHover = true;
    } else {
      data.scrollbar[dir].isStartingPointHover = data.scrollbar[dir].isHovered;
    }
    wrapper.classList.toggle(`hover-${dir}`, data.scrollbar[dir].isStartingPointHover);
  };

  const calculateHeightOfScrollbars = ({ dir, dimensionLong }: DoActionForBothAxis) => {
    data.scrollbar[dir].long.realPercent = (data.container[dimensionLong] / data.content[dimensionLong]) * 100;
    const realPerc = data.scrollbar[dir].long.realPercent;
    data.scrollbar[dir].long.percent = realPerc >= data.minLongPercent ? realPerc : data.minLongPercent;
    data.scrollbar[dir].long.pixel = (data.scrollbar[dir].long.percent / 100) * data.container[dimensionLong];

    const perc = data.scrollbar[dir].long.percent;
    wrapper.style.setProperty(`--${defaultName}-${dir}-${dimensionLong}`, `${perc >= 100 ? 0 : perc}%`);
  };

  const calculateTopOfScrollbar = (e: Event | undefined, { dir, dimensionLong, isLeftOrTop }: DoActionForBothAxis) => {
    const isTop = dir === "y" ? "top" : "left";
    const scrollTopLeft = (e?.target as HTMLElement)?.[isLeftOrTop] || containerElement[isLeftOrTop];

    let diffPercent = 0;
    let diffPixels = 0;
    const isScrollbarTooSmall = data.scrollbar[dir].long.realPercent <= data.minLongPercent;
    if (isScrollbarTooSmall) {
      diffPercent = data.minLongPercent - data.scrollbar[dir].long.realPercent;
      diffPixels = (data.container[dimensionLong] * diffPercent) / 100;
    }
    data.scrollbar[dir].gap.toContent.percent = scrollTopLeft / data.content[dimensionLong];
    data.scrollbar[dir].gap.toContainer.pixel =
      ((scrollTopLeft + data.container[dimensionLong] - diffPixels) / data.content[dimensionLong]) *
        (data.container[dimensionLong] - diffPixels) -
      (data.scrollbar[dir].long.pixel - diffPixels);

    wrapper.style.setProperty(`--${defaultName}-${dir}-${isTop}`, `${data.scrollbar[dir].gap.toContainer.pixel}px`);
  };

  const scrollOnDrag = (event: MouseEvent, prevent = false) => {
    doActionForBothAxis(internalConfig, ({ dir, dimensionLong, isLeftOrTop }) => {
      if (data.rail[dir].isStartingPointHover) {
        data.rail[dir].isStartingPointHover = true;
      } else {
        data.rail[dir].isStartingPointHover = data.rail[dir].isHovered;
      }

      if (data.rail[dir].isStartingPointHover) {
        prevent && event.preventDefault();

        if (data.scrollbar[dir].isGrabbed) data.scrollbar[dir].isGrabbed = true;
        else {
          data.scrollbar[dir].isGrabbed = data.scrollbar[dir].isHovered;
          if (data.scrollbar[dir].isGrabbed) {
            data.scrollbar[dir].dragDiff = data.scrollbar[dir].gap.toContainer.pixel - data.mouse[dir];
          } else {
            data.scrollbar[dir].dragDiff = -data.scrollbar[dir].long.pixel / 2;
          }
        }

        wrapper.classList.toggle(`active-${dir}`, data.scrollbar[dir].isGrabbed);

        const perc = (data.mouse[dir] + data.scrollbar[dir].dragDiff) / data.container[dimensionLong];
        data.scrollbar[dir].gap.toContent.pixel = data.content[dimensionLong] * perc;
        containerElement[isLeftOrTop] = data.scrollbar[dir].gap.toContent.pixel;
      }
    });
  };

  const calculateScrollbars = () => {
    updateContainerDimensions();
    doActionForBothAxis(internalConfig, (data) => {
      calculateHeightOfScrollbars(data);
      calculateTopOfScrollbar(void 0, data);
    });
  };

  const mouseDownHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    data.mouse.isHold = true;
    doActionForBothAxis(internalConfig, hoverScrollbar);
  };
  window[addEventListener]("mousedown", mouseDownHandler, { passive: true });
  const mouseUpHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    data.mouse.isHold = false;

    doActionForBothAxis(internalConfig, (callbackData) => {
      data.rail[callbackData.dir].isStartingPointHover = false;
      data.scrollbar[callbackData.dir].isStartingPointHover = false;
      data.scrollbar[callbackData.dir].isGrabbed = false;
      wrapper.classList.remove(`active-${callbackData.dir}`);
      hoverScrollbar(callbackData);
    });
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
    doActionForBothAxis(internalConfig, hoverScrollbar);
  };
  window[addEventListener]("mousemove", mouseMoveHandler, { passive: true });

  const onHoverRails = () => {
    doActionForBothAxis(internalConfig, ({ dir, reverseDir, dimensionLong, dimensionShort, scrollbarShort }) => {
      data.rail[dir].isHovered =
        isRailHoveredShort({ reverseDir, scrollbarShort, dimensionShort }) &&
        data.mouse[dir] <= data.container[dimensionLong] &&
        data.mouse[dir] >= 0;
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
    if (!internalConfig.enableFocusPrevent) return;
    if (data.rail.x.isHovered || data.rail.y.isHovered) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  };
  wrapper.addEventListener("focus", focusHandler);

  const scrollHandler = (e: Event) =>
    doActionForBothAxis(internalConfig, (callbackData) => calculateTopOfScrollbar(e, callbackData));
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
    containerElement.removeEventListener("mousemove", containerMouseMoveHandler);
    wrapper.removeEventListener("focus", focusHandler);
    window.removeEventListener("mousedown", mouseDownHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
    window.removeEventListener("mousemove", mouseMoveHandler);
    unwrap(wrapper);
    containerElement.classList.remove(internalConfig.className);
  };

  return {
    detach,
  };
};
//replace-this-end
