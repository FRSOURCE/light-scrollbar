import { DeepRequired } from "ts-essentials";

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
// #region wrapperPlacementDef
export enum WrapperPlacement {
  "inside" = "inside",
  "outside" = "outside",
}
// #endregion wrapperPlacementDef

// #region barDef
export type BarConfig = {
  y?: {
    width?: number;
    offset?: [number, number];
  };
  x?: {
    height?: number;
    offset?: [number, number];
  };
};
// #endregion barDef

export type Config = {
  // #region bar
  bar?: BarConfig;
  // #endregion bar
  // #region enableRail
  enableRail?: boolean;
  // #endregion enableRail
  // #region rail
  // every value that is not set is taken from `bar`
  rail?: BarConfig;
  // #endregion rail
  // #region plugins
  plugins?: LightScrollbarPlugin[];
  // #endregion plugins
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
  // #region AttachUpdate
  update: () => void
  // #endregion AttachUpdate
} | undefined;

export type Axis = "x" | "y";
export type Dimension = "height" | "width";

export enum OriginalState {
  "InnerGenerated", //placement inner, outerElement is el, innerElement is generated
  "InnerParent", //placement inner, outerElement is el, innerElement is wrapper element
  "OuterGenerated", //placement outer, outer el is generated, innerElement is el
  "OuterParent", //plaement outer, outerElement is wrapper, innerElement is el
}


export type InternalConfig = DeepRequired<Omit<Config, "rail" | "plugins">> & Pick<Config, "rail"> & {
  plugins: LightScrollbarPlugin[];
};

// #region pluginDef
export type PluginContext = {
  config: InternalConfig;
  innerElement: HTMLElement;
  outerElement: HTMLElement;
};

export type PluginAxisUpdate = {
  // whether the scrollbar of this axis is shown (content overflows the container)
  visible: boolean;
  // length of the track the thumb moves along - the container edge without the corner,
  // when both scrollbars are visible
  length: number;
};

export type PluginUpdate = {
  x: PluginAxisUpdate;
  y: PluginAxisUpdate;
};

// a strip along the container edge, like `bar`: `size` - thickness, `offset` - distance from the edge
export type PluginHitArea = {
  size: number;
  offset: number;
};

export type PluginInstance = {
  // additional strips that react to the mouse like the scrollbar does (hover, press, drag);
  // the corner where both scrollbars cross is sized by the thickest strip of the other axis
  hitArea?: Partial<Record<Axis, PluginHitArea>>;
  // called whenever the scrollbars are recalculated (resize, content change)
  update?: (state: PluginUpdate) => void;
  // called on `detach()`, before the original DOM structure is restored
  detach?: () => void;
};

export type LightScrollbarPlugin = {
  name: string;
  // called once by `attach()`; return nothing to stay inactive for this instance
  setup: (context: PluginContext) => PluginInstance | void;
};
// #endregion pluginDef

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
