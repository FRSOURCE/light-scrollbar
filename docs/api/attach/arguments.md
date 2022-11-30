# attach - arguments

Possible arguments that can be used in `attach` method.

## `bar`

General settings for scrollbar "bar" thickness and offset.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#bar

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#bar

## `className`

ClassName used to target HTMLElement that has `overflow: auto` on it, meaning is scrollable container.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#className

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#className

## `disableFocusPrevent`

By default emitting focus event is disabled, means when scroll is initialized from this container no focus event will be emitted.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#disableFocusPrevent

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#disableFocusPrevent

## `wrapperPlacement`

In order to create custom scrollbar, at this moment only possible solution is to wrap scrollable container with wrapper. This plugin can create wrapper inside your container and switch node and its all classes/attrs/listeners from original container to inner child, or create outside wrapper.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#wrapperPlacement

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#wrapperPlacement

<<< src/utils/types.ts#wrapperPlacementDef

## `wrapperElement`

There is possibility to create wrapper element from given HTMLElement passed via this parameter.

<sup><sub>**Default value**</sub></sup>

`null`

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#wrapperElement

## `showOnHover`

Scrollbars can be visible only when hover on container.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#showOnHover

<sup><sub>**Type**</sub></sup>

<<< src/utils/types.ts#showOnHover
