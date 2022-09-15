# Instalation

Light scrollbar was created for minumim DOM alteration. Wrapping element is still required, but this is only DOM change light-scrollbar do. Scrollbar itself is created based on pseudo elements `after` and `before`. What is special about light-scrollbar? that it can wrap scrollable container `inside` and `outside` (more in [Examples](/examples/default) page )

```bash
# npm
npm install @frsource/light-scrollbar

# Yarn
yarn add @frsource/light-scrollbar

# Pnpm
pnpm add @frsource/light-scrollbar
```

### Modern JS/Typescript

```ts
import { attach } from "@frsource/light-scrollbar";
const scrollingElement = document.querySelector("element-with-overflow-auto");
attach(scrollingElement);
```

### UMD

```js
const scrollingElement = document.querySelector("element-with-overflow-auto");
window.lightScrollbar.attach(scrollingElement);
```
