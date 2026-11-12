---
"@frsource/light-scrollbar": minor
---

Scrollbars follow the `overflow` of the scrollable element and a new `update()` method is returned from `attach()`.

- A scrollbar (and the rail) is shown only along an axis with `overflow` set to `auto` or `scroll`. With `visible`, `hidden` or `clip` it is hidden and doesn't react to the mouse.
- Changing `overflow` with a class or an inline style on the element you attached to is picked up automatically.
- With `wrapperPlacement: "inside"` (default) the generated inner element now inherits `overflow` from the element you attached to, instead of always using `overflow: auto`. If that element has no `overflow` set, add `overflow: auto` to it - otherwise its content no longer scrolls.
- `update()` recalculates the scrollbars after DOM changes the plugin doesn't observe, e.g. `overflow` changed by a class on an ancestor.
