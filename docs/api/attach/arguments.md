# attach - arguments

Possible arguments that can be used in `attach` method.

## `bar`

General settings for scrollbar "bar" thickness and offset.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#bar

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#bar

<<< ../../../src/utils/types.ts#barDef

## `enableRail`

Shows a rail - the background track under the scrollbar thumb. The rail is an optional plugin, so it has to be passed in [`plugins`](#plugins) as well; without it `enableRail` only logs a warning. See the [Rail example](/examples/rail).

```ts
import { rail } from "@frsource/light-scrollbar/rail";
import "@frsource/light-scrollbar/dist/rail.css";

attach(el, { enableRail: true, plugins: [rail] });
```

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#enableRail

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#enableRail

## `rail`

Rail thickness and offset, same shape as [`bar`](#bar). Every value that is not set is taken from `bar`, so with `enableRail` alone the rail has exactly the size and position of the scrollbar. Used only when [`enableRail`](#enablerail) is on.

::: info MOUSE AREA
With the rail on, the whole rail reacts to the mouse like the scrollbar does: hovering, pressing and dragging work anywhere on the rail, also when it is thicker than the scrollbar or placed with a different offset. When both rails are visible, the corner where they cross is sized by the thicker of the rail and the scrollbar, and the scrollbar stops where the rail ends.
:::

<sup><sub>**Default value**</sub></sup>

values of `bar`

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#rail

<<< ../../../src/utils/types.ts#barDef

## `plugins`

Optional features that live in separate entries, so they are added to your bundle only when you import them. Currently available: `rail` from `@frsource/light-scrollbar/rail`.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#plugins

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#plugins

<<< ../../../src/utils/types.ts#pluginDef

## `className`

ClassName used to target HTMLElement that has `overflow: auto` on it, meaning is scrollable container.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#className

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#className

## `disableFocusPrevent`

By default emitting focus event is disabled, means when scroll is initialized from this container no focus event will be emitted.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#disableFocusPrevent

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#disableFocusPrevent

## `wrapperPlacement`

In order to create custom scrollbar, at this moment only possible solution is to wrap scrollable container with wrapper. This plugin can create wrapper inside your container and switch node and its all classes/attrs/listeners from original container to inner child, or create outside wrapper.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#wrapperPlacement

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#wrapperPlacement

<<< ../../../src/utils/types.ts#wrapperPlacementDef

## `wrapperElement`

There is possibility to create wrapper element from given HTMLElement passed via this parameter.

<sup><sub>**Default value**</sub></sup>

`null`

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#wrapperElement

## `showOnHover`

Scrollbars can be visible only when hover on container.

<sup><sub>**Default value**</sub></sup>

<<< ../../../src/index.ts#showOnHover

<sup><sub>**Type**</sub></sup>

<<< ../../../src/utils/types.ts#showOnHover
