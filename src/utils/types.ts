import { DeepRequired } from "ts-essentials";

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
// #region WrapperPlacement
export enum WrapperPlacement {
  "inside" = "inside",
  "outside" = "outside",
}
// #endregion WrapperPlacement

// #region Config
export type Config = {
  bar?: {
    y?: {
      width?: number;
      offset?: [number, number];
    };
    x?: {
      height?: number;
      offset?: [number, number];
    };
  };
  className?: string;
  disableFocusPrevent?: boolean;
  wrapperPlacement?: WrapperPlacement;
  wrapperElement?: HTMLElement;
};
// #endregion Config

// #region LightScrollbarReturns
export type LightScrollbarReturns = {
  innerElement: HTMLElement;
  outerElement: HTMLElement;
  detach: () => void
} | undefined;
// #endregion LightScrollbarReturns

export type Axis = "x" | "y";
export type Dimension = "height" | "width";

export enum OriginalState {
  "InnerGenerated", //placement inner, outerElement is el, innerElement is generated
  "InnerParent", //placement inner, outerElement is el, innerElement is wrapper element
  "OuterGenerated", //placement outer, outer el is generated, innerElement is el
  "OuterParent", //plaement outer, outerElement is wrapper, innerElement is el
}

export type InternalConfig = DeepRequired<Config>;

export type DoActionForBothAxis = {
  dir: Axis;
  isDirY: boolean;
  isLeftOrTop: "scrollTop" | "scrollLeft";
  reverseDir: Axis;
  dimensionLong: Dimension;
  dimensionShort: Dimension;
  scrollbarShort: number;
  scrollbarOffsetLong: number;
  scrollbarOffsetShort: number;
};
