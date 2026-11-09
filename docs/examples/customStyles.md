# Custom styles example

Scrollbar and rail with custom colors, radius, opacity and border. Hover or drag the scrollbar to see the active state.

<script setup>
import CustomStylesExample from './customStyles.vue'
</script>
<CustomStylesExample/>

Colors and radius are changed only with CSS variables - see [CSS → Styles](/css/styles) for the full list. Things that have no variable, like `opacity` or `border` here, are your own rules on the pseudo-elements:

- bar (scrollbar thumb): outer element `.light-scrollbar-wrapper-outside`, `::before` - x, `::after` - y,
- rail: inner element `.light-scrollbar-wrapper-inside.light-scrollbar-rail`, `::before` - x, `::after` - y,
- hover and drag: `hover-x` / `hover-y` and `active-x` / `active-y` classes on the outer element.

## SCSS

The styles used in the example above:

<<< ./customStyles.scss

## CSS

The same styles compiled to plain CSS:

<<< ./customStyles.css

## attach

```ts
import { attach } from "@frsource/light-scrollbar";
import { rail } from "@frsource/light-scrollbar/rail";
import "@frsource/light-scrollbar/dist/index.css";
import "@frsource/light-scrollbar/dist/rail.css";
import "./customStyles.scss";

attach(document.querySelector(".custom-scrollbar .my-scrollbar"), {
  enableRail: true,
  plugins: [rail],
  // 6px scrollbar in the middle of the 12px rail
  bar: { y: { width: 6, offset: [3, 0] }, x: { height: 6, offset: [0, 3] } },
  rail: { y: { width: 12, offset: [0, 0] }, x: { height: 12, offset: [0, 0] } },
});
```
