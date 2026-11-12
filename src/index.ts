import "./index.scss";
import { removeAllStylesWithPrefix, removeAllClassesWithPrefix, restoreTabIndex } from "./utils/domUtils";
import {
  Axis,
  Config,
  DoActionForBothAxis,
  InternalConfig,
  OriginalState,
  RequireField,
  WrapperPlacement,
  LightScrollbarReturns,
  PluginHitArea,
} from "./utils/types";
import { deepMergeConfig, doActionForBothAxis, getScrollableAxes, reverseDir } from "./utils/utils";
// TODO: increase dragging area for y, e.g 5px to left
// TODO: increase bar once hovered

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
  // #region enableRail
  enableRail: false,
  // #endregion enableRail
  // #region plugins
  plugins: [],
  // #endregion plugins
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
export type {
  BarConfig,
  LightScrollbarPlugin,
  PluginAxisUpdate,
  PluginContext,
  PluginHitArea,
  PluginInstance,
  PluginUpdate,
} from "./utils/types";
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

  // optional features (e.g. rail) live in separate entries, so they are bundled only when imported
  const pluginInstances = internalConfig.plugins.map((plugin) =>
    plugin.setup({ config: internalConfig, innerElement, outerElement })
  );
  if (internalConfig.enableRail && !internalConfig.plugins.some(({ name }) => name === "rail")) {
    console.warn('[light-scrollbar] enableRail requires plugins: [rail] from "@frsource/light-scrollbar/rail"');
  }
  // strips along the container edge that react to the mouse: the scrollbar itself + the ones added by plugins
  const hitAreas = {} as Record<Axis, PluginHitArea[]>;
  doActionForBothAxis(internalConfig, ({ dir, scrollbarShort, scrollbarOffsetShort }) => {
    hitAreas[dir] = [{ size: scrollbarShort, offset: scrollbarOffsetShort }];
    pluginInstances.forEach((instance) => {
      const hitArea = instance?.hitArea?.[dir];
      if (hitArea) hitAreas[dir].push(hitArea);
    });
  });

  let containerRect = innerElement.getBoundingClientRect();
  // no comments inside `data` - scripts/replace.js flattens it into a single line to mangle its keys.
  // `canScroll` - axes the inner element can be scrolled along (overflow: auto / scroll), see getScrollableAxes
  const data = {
    canScroll: {
      x: true,
      y: true,
    },
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
        track: 0,
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
        track: 0,
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

  type IsRailHoveredParameters = RequireField<Partial<DoActionForBothAxis>, "dir" | "reverseDir" | "dimensionShort">;
  // whether the mouse is over any of the axis hit areas, measured across the axis (e.g. horizontally for y)
  const isRailHoveredShort = ({ dir, reverseDir, dimensionShort }: IsRailHoveredParameters) =>
    hitAreas[dir].some(
      ({ size, offset }) =>
        data.mouse[reverseDir] >= data.container[dimensionShort] - size - offset &&
        data.mouse[reverseDir] < data.container[dimensionShort] - offset
    );

  // a scrollbar is shown only when the axis is scrollable (overflow: auto / scroll) and the content overflows
  const isScrollbarVisible = (dir: Axis) => data.canScroll[dir] && data.scrollbar[dir].long.realPercent < 100;

  const hoverScrollbar = ({ dir, reverseDir, dimensionShort }: DoActionForBothAxis) => {
    data.scrollbar[dir].isHovered =
      isScrollbarVisible(dir) &&
      isRailHoveredShort({ dir, reverseDir, dimensionShort }) &&
      data.mouse[dir] >= data.scrollbar[dir].gap.toContainer.pixel &&
      data.mouse[dir] <= data.scrollbar[dir].gap.toContainer.pixel + data.scrollbar[dir].long.pixel;

    if (data.scrollbar[dir].isStartingPointHover) {
      data.scrollbar[dir].isStartingPointHover = true;
    } else {
      data.scrollbar[dir].isStartingPointHover = data.scrollbar[dir].isHovered;
    }
    outerElement.classList.toggle(`hover-${dir}`, data.scrollbar[dir].isStartingPointHover);
  };

  const calculateVisiblePartOfContent = ({ dir, dimensionLong }: DoActionForBothAxis) => {
    data.scrollbar[dir].long.realPercent = (data.container[dimensionLong] / data.content[dimensionLong]) * 100;
    // the thickest hit area (e.g. a rail wider than the scrollbar) decides how big the corner is
    data.scrollbar[dir].short = Math.max(...hitAreas[dir].map(({ size, offset }) => size + offset));
  };

  // track is the part of the container edge the scrollbar moves along - when both scrollbars are visible,
  // the bottom right corner (x hit area height * y hit area width) is excluded from both tracks
  const calculateTrackOfScrollbar = ({ dir, reverseDir, dimensionLong }: DoActionForBothAxis) => {
    const corner = isScrollbarVisible(dir) && isScrollbarVisible(reverseDir) ? data.scrollbar[reverseDir].short : 0;
    data.scrollbar[dir].track = data.container[dimensionLong] - corner;
  };

  const calculateLongDimensionOfScrollbars = ({ dir, dimensionLong }: DoActionForBothAxis) => {
    const realPerc = data.scrollbar[dir].long.realPercent;
    data.scrollbar[dir].long.percent = realPerc >= data.minLongPercent ? realPerc : data.minLongPercent;
    data.scrollbar[dir].long.pixel = (data.scrollbar[dir].long.percent / 100) * data.scrollbar[dir].track;

    const pixel = isScrollbarVisible(dir) ? data.scrollbar[dir].long.pixel : 0;
    outerElement.style.setProperty(`--${defaultCssVarName}-bar-${dir}-${dimensionLong}`, `${pixel}px`);
    // a hidden scrollbar can't stay hovered or dragged (e.g. overflow switched to hidden in the middle of a drag)
    if (!pixel) outerElement.classList.remove(`hover-${dir}`, `active-${dir}`);
  };

  const calculateTopOfScrollbar = (e: Event | undefined, { dir, dimensionLong, isLeftOrTop }: DoActionForBothAxis) => {
    const isTop = dir === "y" ? "top" : "left";
    const scrollTopLeft = (e?.target as HTMLElement)?.[isLeftOrTop] || innerElement[isLeftOrTop];

    data.scrollbar[dir].gap.toContent.percent = scrollTopLeft / data.content[dimensionLong];

    const containerPlusScrollbarLong =
      data.content[dimensionLong] - (data.content[dimensionLong] * data.scrollbar[dir].long.realPercent) / 100;
    const percScrollbarPosition = (scrollTopLeft / containerPlusScrollbarLong) * 100;

    data.scrollbar[dir].gap.toContainer.pixel =
      (percScrollbarPosition / 100) * (data.scrollbar[dir].track - data.scrollbar[dir].long.pixel);

    outerElement.style.setProperty(
      `--${defaultCssVarName}-bar-${dir}-${isTop}`,
      `${data.scrollbar[dir].gap.toContainer.pixel}px`
    );
  };

  const scrollOnDrag = () => {
    doActionForBothAxis(internalConfig, ({ dir, dimensionLong, isLeftOrTop }) => {
      if (data.rail[dir].isStartingPointHover) {
        data.rail[dir].isStartingPointHover = true;
      } else {
        data.rail[dir].isStartingPointHover = data.rail[dir].isHovered;
      }
      if (data.rail[dir].isStartingPointHover && data.mouse.isHoldRail && isScrollbarVisible(dir)) {
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

        const perc =
          (data.mouse[dir] + data.scrollbar[dir].dragDiff) /
          (data.scrollbar[dir].track - data.scrollbar[dir].long.pixel);
        data.scrollbar[dir].gap.toContent.pixel = (data.content[dimensionLong] - data.container[dimensionLong]) * perc;
        innerElement[isLeftOrTop] = data.scrollbar[dir].gap.toContent.pixel;
      }
    });
  };

  const calculateScrollbars = (calculate = false) => {
    if (!calculate) return;
    data.canScroll = getScrollableAxes(innerElement);
    updateContainerDimensions();
    doActionForBothAxis(internalConfig, calculateVisiblePartOfContent);
    doActionForBothAxis(internalConfig, (data) => {
      calculateTrackOfScrollbar(data);
      calculateLongDimensionOfScrollbars(data);
      calculateTopOfScrollbar(void 0, data);
    });
    const pluginUpdate = {
      x: { visible: isScrollbarVisible("x"), length: data.scrollbar.x.track },
      y: { visible: isScrollbarVisible("y"), length: data.scrollbar.y.track },
    };
    pluginInstances.forEach((instance) => instance?.update?.(pluginUpdate));
  };

  const windowMouseDownHandler = (e: MouseEvent) => {
    const isInScrollbar = (e.target as HTMLElement)?.closest(`.${outerElementClassname}`);
    if (!isInScrollbar) return;
    containerRect = innerElement.getBoundingClientRect();
    updateMousePosition(e);
    onHoverRails(true);
    // every press starts a new drag - drop rail state left over from a previous press,
    // otherwise the other axis would be dragged along (#531)
    doActionForBothAxis(internalConfig, ({ dir }) => {
      data.rail[dir].isStartingPointHover = false;
      data.scrollbar[dir].isGrabbed = false;
    });
    data.mouse.isHoldInsideScrollbar = true;
    data.mouse.isHoldRail = data.rail.x.isHovered || data.rail.y.isHovered;

    doActionForBothAxis(internalConfig, hoverScrollbar);
    // start the drag on the press itself, not on the first move: pressing the rail (or the scrollbar strip)
    // away from the thumb jumps the thumb under the cursor right away, and pressing the thumb itself
    // remembers where it was grabbed - so it doesn't move until the mouse does
    scrollOnDrag();
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
      scrollOnDrag();
    } else {
      data.scrollbar.y.isStartingPointHover = false;
      data.scrollbar.x.isStartingPointHover = false;
      innerElement.classList.remove("no-smooth");
    }
    doActionForBothAxis(internalConfig, hoverScrollbar);
  };

  const onHoverRails = (calculate = false) => {
    if (!calculate) return;
    doActionForBothAxis(internalConfig, ({ dir, reverseDir, dimensionShort }) => {
      data.rail[dir].isHovered =
        isScrollbarVisible(dir) &&
        isRailHoveredShort({ dir, reverseDir, dimensionShort }) &&
        data.mouse[dir] < data.scrollbar[dir].track &&
        data.mouse[dir] >= 0;
    });
  };

  // runs before the window mousemove listener (bubbling order), so the mouse position has to be refreshed here -
  // otherwise rails hover state would be computed from the previous event's position
  const containerMouseMoveHandler = (e: MouseEvent) => {
    containerRect = innerElement.getBoundingClientRect();
    updateMousePosition(e);
    onHoverRails(true);
    calculateScrollbars(true);
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

  // `overflow` usually changes through a class or an inline style - of the inner element (the scroll container)
  // or of the outer one (the generated inner element inherits it). Other sources (e.g. a class on an ancestor,
  // a media query) aren't observed - call `update()` then.
  const overflowObserver = new MutationObserver(() => {
    const canScroll = getScrollableAxes(innerElement);
    // our own class / style changes (hover, thumb position) don't touch overflow - nothing to recalculate then
    if (canScroll.x !== data.canScroll.x || canScroll.y !== data.canScroll.y) calculateScrollbars(true);
  });
  [innerElement, outerElement].forEach((element) =>
    overflowObserver.observe(element, { attributes: true, attributeFilter: ["class", "style"] })
  );

  calculateScrollbars(true);

  innerElement.addEventListener("scroll", scrollHandler, { passive: true });
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
    overflowObserver.disconnect();
    innerElement.removeEventListener("scroll", scrollHandler);
    outerElement.removeEventListener("mousemove", containerMouseMoveHandler);
    outerElement.removeEventListener("focus", focusHandler);
    window.removeEventListener("mousedown", windowMouseDownHandler);
    window.removeEventListener("mouseup", windowMouseUpHandler);
    window.removeEventListener("mousemove", windowMouseMoveHandler);
    pluginInstances.forEach((instance) => instance?.detach?.());
    unwrap(outerElement, innerElement, internalConfig.className);
  };

  // recalculates everything from the current DOM - for changes the plugin doesn't observe
  const update = () => {
    containerRect = innerElement.getBoundingClientRect();
    calculateScrollbars(true);
  };

  return {
    detach,
    update,
    innerElement,
    outerElement,
  };
};
//replace-this-end
