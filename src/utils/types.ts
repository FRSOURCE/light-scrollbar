import { DeepRequired } from "ts-essentials";

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
// #region wrapperPlacementDef
export enum WrapperPlacement {
  "inside" = "inside",
  "outside" = "outside",
}
// #endregion wrapperPlacementDef

export type Config = {
  // #region bar
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
  // #endregion bar
  // #region className
  className?: string;
  // #endregion className
  // #region disableFocusPrevent
  disableFocusPrevent?: boolean;
  // #endregion disableFocusPrevent
  // #region wrapperPlacement
  wrapperPlacement?: WrapperPlacement;
  // #endregion wrapperPlacement
  // #region wrapperElement
  wrapperElement?: HTMLElement;
  // #endregion wrapperElement
  // #region showOnHover
  showOnHover?: number | false
  // #endregion showOnHover
};

export type LightScrollbarReturns = {
  // #region AttachInnerElement
  innerElement: HTMLElement;
  // #endregion AttachInnerElement
  // #region AttachOuterElement
  outerElement: HTMLElement;
  // #endregion AttachOuterElement
  // #region AttachReturn
  detach: () => void
  // #endregion AttachReturn
} | undefined;

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
