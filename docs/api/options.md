# Options

Parameters that can be used in library initialization

e.g
```ts
import { attach, WrapperPlacement } from "light-scrollbar";

const scrollbarContainerElement = document.querySelector(".my-scrollbar");
const { innerElement, outerElement, detach } = attach(scrollbarContainerElement, {
    wrapperPlacement: WrapperPlacement.outside
});
```

## Parameters

* ## `bar`
General settings for scrollbar "bar" thickness and offset.

**Default value**

<<< src/index.ts#bar

* ## `className`
ClassName used to target HTMLElement that has `overflow: auto` on it, meaning is scrollable container.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#className

* ## `disableFocusPrevent`
By default emitting focus event is disabled, means when scroll is initialized from this container no focus event will be emitted.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#disableFocusPrevent

* ## `wrapperPlacement`
In order to create custom scrollbar, at this moment only possible solution is to wrap scrollable container with wrapper. This plugin can create wrapper inside your container and switch node and its all classes/attrs/listeners from original container to inner child, or create outside wrapper.

<sup><sub>**Default value**</sub></sup>

<<< src/index.ts#wrapperPlacement

* ## `wrapperElement`
There is possibility to create wrapper element from given HTMLElement passed via this parameter.

<sup><sub>**Default value**</sub></sup>

```null```


## Returns

## `innerElement`
Inner element of wrapped scrollable container, see example output code in [example after mount section](/examples/default)

## `outerElement`
Outer element of wrapped scrollable container, see example output code in [example after mount section](/examples/default)

## `detach`
Method that can be used to destroy/detach light-scrollbar from your element
