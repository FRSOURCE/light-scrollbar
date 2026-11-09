# Rail example

Example with a rail - the background track under the scrollbar thumb. Here the rail is 10px thick and the 6px thumb is moved 2px from the edge, so it sits in the middle of the rail.

On top of the rail the default theme uses a darker thumb (`#94a3b8`, hovered or dragged `#64748b`), so it stays visible against the rail background (`#f1f5f9`). All of these colors and the radius can be changed with CSS variables - see [CSS → Styles](/css/styles).

<script setup>
import RailExample from './rail.vue'
</script>
<RailExample/>

The rail is an optional plugin, so it is bundled only when you import it:

```ts
import { attach } from "@frsource/light-scrollbar";
import { rail } from "@frsource/light-scrollbar/rail";
import "@frsource/light-scrollbar/dist/index.css";
import "@frsource/light-scrollbar/dist/rail.css";

attach(scrollingElement, {
  enableRail: true,
  plugins: [rail],
  bar: { y: { offset: [2, 0] }, x: { offset: [0, 2] } },
  // optional - every value that is not set is taken from `bar`
  rail: { y: { width: 10, offset: [0, 0] }, x: { height: 10, offset: [0, 0] } },
});
```

With UMD, load `dist/rail.umd.js` and pass `window.lightScrollbarRail.rail` in `plugins`.

After mount (wrapper inside) the rail is drawn with the inner element's `::before` (x) and `::after` (y):

```html
<div class="my-scrollbar light-scrollbar-wrapper-outside light-scrollbar-rail">
    <div class="light-scrollbar light-scrollbar-wrapper-inside light-scrollbar-rail">
        ...content
    </div>
</div>
```

::: info MOUSE AREA
The whole rail reacts to the mouse like the scrollbar does - in this example you can grab the 6px thumb anywhere on the 10px rail, and pressing the rail away from the thumb and dragging moves the thumb under the cursor. The corner where both rails cross doesn't react, and the thumb stops where the rail ends.
:::

::: warning

- The rail uses the inner element's `::before` and `::after`. With `wrapperPlacement: 'outside'` the inner element is your scrollable container, so its own `::before` / `::after` styles would be overwritten.
- To keep the rail in place while the content scrolls, the outer element gets `contain: layout`. Elements with `position: fixed` inside the scrolled content are then positioned against the outer element instead of the viewport.
:::
