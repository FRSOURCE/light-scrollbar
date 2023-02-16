import "./index.scss";
import { removeAllStylesWithPrefix, removeAllClassesWithPrefix, restoreTabIndex } from "./utils/domUtils";
import {
  Config,
  DoActionForBothAxis,
  InternalConfig,
  OriginalState,
  RequireField,
  WrapperPlacement,
  LightScrollbarReturns,
} from "./utils/types";
import { deepMergeConfig, doActionForBothAxis, reverseDir } from "./utils/utils";
// TODO: increase dragging area for y, e.g 5px to left
// TODO: intersection of x/y scrollbars in corner should be excluded
// TODO: add rail
// TODO: min height should be fixed e.g 30px? maybe prop and possibility to use px and %?
// TODO: sub pixel diff on min 10% scrollbar
// TODO: when  paginated list recalculate grab
// TODO: increase bar once hovered
// TODO: offset to edges
// TODO: hide when overflow:hidden?
// TODO: create update() method with hidden(maybe or check mutation) and changing width/height

let originalState: OriginalState;
let outerHadTabIndex: string | null = null;
let innerHadTabIndex: string | null = null;
const defaultCssVarName = "ls";

function wrap(el: HTMLElement, wrapper: HTMLElement, config: InternalConfig) {
  outerHadTabIndex = wrapper.getAttribute("tabindex");
  innerHadTabIndex = el.getAttribute("tabindex");
  if (config.wrapperPlacement === "outside") {
    if (wrapper.children[0] === el) {
      originalState = OriginalState.OuterParent;
      return;
    } else {
      originalState = OriginalState.OuterGenerated;
    }
    el?.parentNode?.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  } else {
    if (wrapper.children[0] === el) {
      el?.parentNode?.parentNode?.insertBefore(el, wrapper);
      originalState = OriginalState.InnerParent;
    } else {
      originalState = OriginalState.InnerGenerated;
    }
    while (el.firstChild) wrapper.appendChild(el.firstChild);
    el.appendChild(wrapper);
  }
}

// TODO: cover standalone wrapper - right now only can wrap but unwrap
const findChildAndAppendTo = (source: HTMLElement, target: HTMLElement | null) => {
  if (!target) return;
  while (source.firstChild) target.appendChild(source.firstChild);
};

const unwrap = (el: HTMLElement, wrapper: HTMLElement, className: string) => {
  if (originalState === OriginalState.InnerGenerated) {
    findChildAndAppendTo(wrapper, el);
    wrapper.remove();
  } else if (originalState === OriginalState.InnerParent) {
    findChildAndAppendTo(wrapper, el);
    el?.parentNode?.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  } else if (originalState === OriginalState.OuterGenerated) {
    el.replaceWith(el.children[0]);
  }

  removeAllClassesWithPrefix(el, className);
  removeAllClassesWithPrefix(wrapper, className);
  removeAllStylesWithPrefix(el, defaultCssVarName);
  removeAllStylesWithPrefix(wrapper, defaultCssVarName);
  restoreTabIndex(el, innerHadTabIndex);
  restoreTabIndex(wrapper, outerHadTabIndex);
  el.removeAttribute("data-ls-created");
  wrapper.removeAttribute("data-ls-created");
};

const defaultConfig: Config = {
  // #region bar
  bar: {
    y: {
      width: 6,
      offset: [0, 0],
    },
    x: {
      height: 6,
      offset: [0, 0],
    },
  },
  // #endregion bar
  // #region className
  className: "light-scrollbar",
  // #endregion className
  // #region disableFocusPrevent
  disableFocusPrevent: true,
  // #endregion disableFocusPrevent
  // #region wrapperPlacement
  wrapperPlacement: WrapperPlacement.inside,
  // #endregion wrapperPlacement
  // #region showOnHover
  showOnHover: false,
  // #endregion showOnHover
};

const setupWidthAndHeightForScrollbars = (internalConfig: InternalConfig, wrapper: HTMLElement) => {
  doActionForBothAxis(internalConfig, ({ dir, dimensionShort, scrollbarShort, scrollbarOffsetShort }) => {
    wrapper.style.setProperty(`--${defaultCssVarName}-bar-${dir}-${dimensionShort}`, `${scrollbarShort}px`);
    wrapper.style.setProperty(
      `--${defaultCssVarName}-bar-${dir}-offset-${reverseDir(dir)}`,
      `${scrollbarOffsetShort}px`
    );
  });
};

export { Config, WrapperPlacement, LightScrollbarReturns };
//replace-this-start
export const attach = (containerElement: HTMLElement, config: Config = {}): LightScrollbarReturns => {
  if (!containerElement) return;
  const internalConfig = deepMergeConfig(defaultConfig, config) as InternalConfig;
  const wrapper = (internalConfig.wrapperElement as HTMLElement) || document.createElement("div");
  wrap(containerElement, wrapper, internalConfig);

  const isOutside = internalConfig.wrapperPlacement === "outside";
  const innerElement = isOutside ? containerElement : wrapper;
  const outerElement = isOutside ? wrapper : containerElement;

  innerElement.classList.add(internalConfig.className);
  innerElement.classList.add(`${internalConfig.className}-wrapper-${WrapperPlacement.inside}`);
  if (!isOutside) innerElement.dataset.lsCreated = "";
  outerElement.classList.add(internalConfig.className);
  const outerElementClassname = `${internalConfig.className}-wrapper-${WrapperPlacement.outside}`;
  outerElement.classList.add(outerElementClassname);
  if (internalConfig.showOnHover !== false) {
    outerElement.classList.add(`${internalConfig.className}-wrapper-${WrapperPlacement.outside}--show-on-hover`);
    outerElement.style.setProperty(`--${defaultCssVarName}-show-on-hover`, `${internalConfig.showOnHover}ms`);
  }
  outerElement.setAttribute("tabindex", "-1");

  setupWidthAndHeightForScrollbars(internalConfig, outerElement);

  let containerRect = innerElement.getBoundingClientRect();
  const data = {
    mouse: {
      x: 0,
      y: 0,
      isHoldInsideScrollbar: false,
      isHoldRail: false,
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
    data.container.height = innerElement.clientHeight;
    data.container.width = innerElement.clientWidth;
    data.content.height = innerElement.scrollHeight;
    data.content.width = innerElement.scrollWidth;
  };

  type IsRailHoveredParameters = RequireField<
  Partial<DoActionForBothAxis>,
  "reverseDir" | "dimensionShort" | "scrollbarShort" | "scrollbarOffsetShort"
  >;
  const isRailHoveredShort = ({
    reverseDir,
    dimensionShort,
    scrollbarShort,
    scrollbarOffsetShort,
  }: IsRailHoveredParameters) => {
    return (
      data.mouse[reverseDir] >= data.container[dimensionShort] - scrollbarShort - scrollbarOffsetShort &&
      data.mouse[reverseDir] < data.container[dimensionShort] - scrollbarOffsetShort
    );
  };

  const hoverScrollbar = ({
    dir,
    reverseDir,
    scrollbarShort,
    dimensionShort,
    scrollbarOffsetShort,
  }: DoActionForBothAxis) => {
    data.scrollbar[dir].isHovered =
      isRailHoveredShort({ dir, reverseDir, scrollbarShort, dimensionShort, scrollbarOffsetShort }) &&
      data.mouse[dir] >= data.scrollbar[dir].gap.toContainer.pixel &&
      data.mouse[dir] <= data.scrollbar[dir].gap.toContainer.pixel + data.scrollbar[dir].long.pixel;

    if (data.scrollbar[dir].isStartingPointHover) {
      data.scrollbar[dir].isStartingPointHover = true;
    } else {
      data.scrollbar[dir].isStartingPointHover = data.scrollbar[dir].isHovered;
    }
    outerElement.classList.toggle(`hover-${dir}`, data.scrollbar[dir].isStartingPointHover);
  };

  const calculateLongDimensionOfScrollbars = ({ dir, dimensionLong }: DoActionForBothAxis) => {
    data.scrollbar[dir].long.realPercent = (data.container[dimensionLong] / data.content[dimensionLong]) * 100;
    const realPerc = data.scrollbar[dir].long.realPercent;
    data.scrollbar[dir].long.percent = realPerc >= data.minLongPercent ? realPerc : data.minLongPercent;
    data.scrollbar[dir].long.pixel = (data.scrollbar[dir].long.percent / 100) * data.container[dimensionLong];

    const perc = data.scrollbar[dir].long.percent;
    outerElement.style.setProperty(`--${defaultCssVarName}-bar-${dir}-${dimensionLong}`, `${perc >= 100 ? 0 : perc}%`);
  };

  const calculateTopOfScrollbar = (e: Event | undefined, { dir, dimensionLong, isLeftOrTop }: DoActionForBothAxis) => {
    const isTop = dir === "y" ? "top" : "left";
    const scrollTopLeft = (e?.target as HTMLElement)?.[isLeftOrTop] || innerElement[isLeftOrTop];

    let diffPercent = 0;
    let diffPixels = 0;
    const isScrollbarTooSmall = data.scrollbar[dir].long.realPercent <= data.minLongPercent;
    if (isScrollbarTooSmall) {
      diffPercent = data.minLongPercent - data.scrollbar[dir].long.realPercent;
      diffPixels = (data.container[dimensionLong] * diffPercent) / 100;
    }
    data.scrollbar[dir].gap.toContent.percent = scrollTopLeft / data.content[dimensionLong];
    const longestScrollPosition = scrollTopLeft + data.container[dimensionLong] - diffPixels;
    data.scrollbar[dir].gap.toContainer.pixel =
      (longestScrollPosition / data.content[dimensionLong]) * data.container[dimensionLong] -
      data.scrollbar[dir].long.pixel -
      2 * diffPixels;

    outerElement.style.setProperty(
      `--${defaultCssVarName}-bar-${dir}-${isTop}`,
      `${data.scrollbar[dir].gap.toContainer.pixel}px`
    );
  };

  const scrollOnDrag = (event: MouseEvent, prevent = false) => {
    doActionForBothAxis(internalConfig, ({ dir, dimensionLong, isLeftOrTop }) => {
      if (data.rail[dir].isStartingPointHover) {
        data.rail[dir].isStartingPointHover = true;
      } else {
        data.rail[dir].isStartingPointHover = data.rail[dir].isHovered;
      }
      if (data.rail[dir].isStartingPointHover && data.mouse.isHoldRail) {
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

        outerElement.classList.toggle(`active-${dir}`, data.scrollbar[dir].isGrabbed);

        const perc = (data.mouse[dir] + data.scrollbar[dir].dragDiff) / data.container[dimensionLong];
        data.scrollbar[dir].gap.toContent.pixel = data.content[dimensionLong] * perc;
        innerElement[isLeftOrTop] = data.scrollbar[dir].gap.toContent.pixel;
      }
    });
  };

  const calculateScrollbars = (calculate = false) => {
    if (!calculate) return;
    updateContainerDimensions();
    doActionForBothAxis(internalConfig, (data) => {
      calculateLongDimensionOfScrollbars(data);
      calculateTopOfScrollbar(void 0, data);
    });
  };

  const windowMouseDownHandler = (e: MouseEvent) => {
    const isInScrollbar = (e.target as HTMLElement)?.closest(`.${outerElementClassname}`);
    if (!isInScrollbar) return;
    updateMousePosition(e);
    data.mouse.isHoldInsideScrollbar = true;
    data.mouse.isHoldRail = data.rail.x.isHovered || data.rail.y.isHovered;

    doActionForBothAxis(internalConfig, hoverScrollbar);
  };

  const windowMouseUpHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    data.mouse.isHoldInsideScrollbar = false;
    data.mouse.isHoldRail = false;

    doActionForBothAxis(internalConfig, (callbackData) => {
      data.rail[callbackData.dir].isStartingPointHover = false;
      data.scrollbar[callbackData.dir].isStartingPointHover = false;
      data.scrollbar[callbackData.dir].isGrabbed = false;
      outerElement.classList.remove(`active-${callbackData.dir}`);
      hoverScrollbar(callbackData);
    });
  };

  const windowMouseMoveHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    containerRect = innerElement.getBoundingClientRect();

    if (data.mouse.isHoldInsideScrollbar) {
      innerElement.classList.add("no-smooth");
      scrollOnDrag(e);
    } else {
      data.scrollbar.y.isStartingPointHover = false;
      data.scrollbar.x.isStartingPointHover = false;
      innerElement.classList.remove("no-smooth");
    }
    doActionForBothAxis(internalConfig, hoverScrollbar);
  };

  const onHoverRails = (calculate = false) => {
    if (!calculate) return;
    doActionForBothAxis(
      internalConfig,
      ({ dir, reverseDir, dimensionLong, dimensionShort, scrollbarShort, scrollbarOffsetShort }) => {
        data.rail[dir].isHovered =
          isRailHoveredShort({ dir, reverseDir, scrollbarShort, dimensionShort, scrollbarOffsetShort }) &&
          data.mouse[dir] <= data.container[dimensionLong] &&
          data.mouse[dir] >= 0;
      }
    );
  };

  const containerMouseMoveHandler = () => {
    onHoverRails(true);
    calculateScrollbars(true);
  };

  const clickHandler = (e: MouseEvent) => {
    updateMousePosition(e);
    scrollOnDrag(e, true);
  };

  const focusHandler = (e: Event) => {
    if (!internalConfig.disableFocusPrevent) return;
    if (data.rail.x.isHovered || data.rail.y.isHovered) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  };

  const scrollHandler = (e: Event) =>
    doActionForBothAxis(internalConfig, (callbackData) => calculateTopOfScrollbar(e, callbackData));

  const resizeObserver = new ResizeObserver(() => calculateScrollbars(true));
  resizeObserver.observe(innerElement);
  const observer = new MutationObserver(() => calculateScrollbars(true));
  observer.observe(innerElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  calculateScrollbars(true);

  innerElement.addEventListener("scroll", scrollHandler, { passive: true });
  outerElement.addEventListener("click", clickHandler);
  outerElement.addEventListener("mousemove", containerMouseMoveHandler, {
    passive: true,
  });
  outerElement.addEventListener("focus", focusHandler);
  window.addEventListener("mousedown", windowMouseDownHandler, { passive: true });
  window.addEventListener("mouseup", windowMouseUpHandler, { passive: true });
  window.addEventListener("mousemove", windowMouseMoveHandler, { passive: true });

  const detach = () => {
    resizeObserver.disconnect();
    observer.disconnect();
    innerElement.removeEventListener("scroll", scrollHandler);
    outerElement.removeEventListener("click", clickHandler);
    outerElement.removeEventListener("mousemove", containerMouseMoveHandler);
    outerElement.removeEventListener("focus", focusHandler);
    window.removeEventListener("mousedown", windowMouseDownHandler);
    window.removeEventListener("mouseup", windowMouseUpHandler);
    window.removeEventListener("mousemove", windowMouseMoveHandler);
    unwrap(outerElement, innerElement, internalConfig.className);
  };

  return {
    detach,
    innerElement,
    outerElement,
  };
};
//replace-this-end
