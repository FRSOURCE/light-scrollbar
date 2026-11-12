# update

Method that is returned from initialized `attach` method. It recalculates the scrollbars (their size, position and visibility) from the current state of the DOM.

Most changes are picked up automatically, so usually you don't need it:

* resizing the scrollable container,
* adding, removing or editing its content (child nodes, text),
* changing `overflow` of the element you attached to - by a class or an inline style (see [overflow](#overflow)).

Call `update()` after a change the plugin can't see, e.g.:

* `overflow` changed by a class on an ancestor or by a media query,
* an attribute or style change deep in the content that changes its size, without resizing the container.

e.g
```ts{8}
import { attach } from "@frsource/light-scrollbar";

const scrollbarContainerElement = document.querySelector(".my-scrollbar");
const { update } = attach(scrollbarContainerElement);

// a change that the plugin doesn't observe
document.body.classList.add("modal-open"); // e.g. `.modal-open .my-scrollbar { overflow: hidden }`
update();
```

## overflow

A scrollbar is shown only along an axis the element can be scrolled along - `overflow` (or `overflow-x` / `overflow-y`) set to `auto` or `scroll`. With `visible`, `hidden` or `clip` the scrollbar (and the [rail](/examples/rail)) of that axis is hidden and doesn't react to the mouse.

* `wrapperPlacement: "inside"` (default) - set `overflow` on the element you attached to, the generated inner element takes it over,
* `wrapperPlacement: "outside"` - set `overflow` on the element you attached to - it stays the scroll container.

More API details:
* [attach arguments](/api/attach/arguments)
* [attach returns](/api/attach/returns)
* [detach](/api/detach)
