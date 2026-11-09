import "./rail.scss";
import { LightScrollbarPlugin } from "./utils/types";

const cssVar = (name: string) => `--ls-rail-${name}`;

// #region railPlugin
// rail - background track drawn under the scrollbar thumb
// usage: attach(el, { enableRail: true, plugins: [rail] })
export const rail: LightScrollbarPlugin = {
  name: "rail",
  setup({ config, innerElement, outerElement }) {
    if (!config.enableRail) return;

    // every rail value that is not set falls back to the matching `bar` value
    const y = {
      width: config.rail?.y?.width ?? config.bar.y.width,
      offset: config.rail?.y?.offset ?? config.bar.y.offset,
    };
    const x = {
      height: config.rail?.x?.height ?? config.bar.x.height,
      offset: config.rail?.x?.offset ?? config.bar.x.offset,
    };
    // same offset index as `bar` - the distance from the edge the rail sits on
    const yOffset = y.offset[0];
    const xOffset = x.offset[1];

    const className = `${config.className}-rail`;
    innerElement.classList.add(className);
    outerElement.classList.add(className);

    outerElement.style.setProperty(cssVar("y-width"), `${y.width}px`);
    outerElement.style.setProperty(cssVar("y-offset-x"), `${yOffset}px`);
    outerElement.style.setProperty(cssVar("x-height"), `${x.height}px`);
    outerElement.style.setProperty(cssVar("x-offset-y"), `${xOffset}px`);

    return {
      // the whole rail reacts to the mouse like the scrollbar does - also when it is wider than the thumb
      hitArea: {
        y: { size: y.width, offset: yOffset },
        x: { size: x.height, offset: xOffset },
      },
      // the rail covers the whole track - the corner where both rails cross is already excluded by the core
      update({ x: xAxis, y: yAxis }) {
        outerElement.style.setProperty(cssVar("y-height"), `${yAxis.visible ? yAxis.length : 0}px`);
        outerElement.style.setProperty(cssVar("x-width"), `${xAxis.visible ? xAxis.length : 0}px`);
      },
      detach() {
        innerElement.classList.remove(className);
        outerElement.classList.remove(className);
        ["y-width", "y-offset-x", "y-height", "x-height", "x-offset-y", "x-width"].forEach((name) =>
          outerElement.style.removeProperty(cssVar(name)),
        );
      },
    };
  },
};
// #endregion railPlugin
