import { Axis, config, DoActionForBothAxis, InternalConfig } from "./types";

export const isDirY = (dir: Axis) => dir === "y";
export const reverseDir = (dir: Axis) => (isDirY(dir) ? "x" : "y");
export const isHeightOrWidth = (is: boolean) => (is ? "height" : "width");
export const isLeftOrTop = (dir: Axis) => (isDirY(dir) ? "scrollTop" : "scrollLeft");
export const dimensionLong = (dir: Axis) => isHeightOrWidth(isDirY(dir));
//when direction 'y', dimension long is 'height'
export const dimensionShort = (dir: Axis) => isHeightOrWidth(!isDirY(dir));
//when direction 'y', dimension short is 'width'
export const scrollbarShort = (dir: Axis, internalConfig: InternalConfig) =>
  isDirY(dir) ? internalConfig.bar.y.width : internalConfig.bar.x.height;

export const doActionForBothAxis = (internalConfig: InternalConfig, callback: (callbackData: DoActionForBothAxis) => void) => {
  (["x", "y"] as Axis[]).forEach((dir) => {
    callback({
      dir,
      isDirY: isDirY(dir),
      isLeftOrTop: isLeftOrTop(dir),
      reverseDir: reverseDir(dir),
      dimensionLong: dimensionLong(dir),
      dimensionShort: dimensionShort(dir),
      scrollbarShort: scrollbarShort(dir, internalConfig),
      scrollbarOffsetLong: internalConfig.bar[dir].offset[~~isDirY(dir)],
      scrollbarOffsetShort: internalConfig.bar[dir].offset[~~!isDirY(dir)],
    });
  });
};

export const deepMergeConfig = (defaultConfig: config, config: config) => {
  return {
    ...defaultConfig,
    ...config,
    bar: {
      y: { ...defaultConfig?.bar?.y, ...config?.bar?.y },
      x: { ...defaultConfig?.bar?.x, ...config?.bar?.x },
    },
  };
};
