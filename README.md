<p align="center">
  <a href="https://www.npmjs.com/package/@frsource/light-scrollbar">
    <img src="https://img.shields.io/npm/v/@frsource/light-scrollbar" alt="NPM version badge">
  </a>
  <a href="https://bundlephobia.com/result?p=@frsource/light-scrollbar" title="Visit bundlephobia for more details!">
    <img src="https://img.shields.io/bundlephobia/minzip/@frsource/light-scrollbar" alt="Core bundle size badge. Data from bundlephobia.com">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-relase badge">
  </a>
  <a href="https://bundlephobia.com/result?p=@frsource/light-scrollbar">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@frsource/light-scrollbar" alt="Tree shaking supported">
  </a>
  <a href="https://github.com/FRSOURCE/light-scrollbar/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/FRSOURCE/light-scrollbar" alt="license MIT badge">
  </a>
</p>

<h1 align="center">Light Scrollbar - minimalistic light plugin to create custom scrollbar! 💪</h1>

<p align="center">
  <a href="#quick-start">Getting Started</a>
  ·
  <!-- <a href="https://www.frsource.org/light-scrollbar" target="_blank">Demo</a> -->
  <!-- · -->
  <a href="https://github.com/FRSOURCE/light-scrollbar/issues">File an Issue</a>
  ·
  <a href="#questions">Have a question or an idea?</a>
  <br>
</p>

<p align="center">
  <br>
  <i>Light, small library that allows create custom scrollbar.
    <br>Mobile &amp; desktop-friendly
    <br>Performant & with small bundle size (less than 1400B!)
    <br>Possibility to use `scroll-behavior: smooth`
    <br>Published as separate bundles for JS ES5 or modern browsers thanks to <a href="https://www.npmjs.com/package/microbundle">microbundle</a>
    <br>Written completely in <a href="https://www.typescriptlang.org">typescript</a></i>
    <br>Published under <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a> license</i>
  <br>
  <br>
</p>

## Quick start

### Installation

```bash
# npm
npm install @frsource/light-scrollbar

# Yarn
yarn add @frsource/light-scrollbar
```

### Modern JS/Typescript

```ts
import { attach } from "@frsource/light-scrollbar";
const scrollingElement = document.querySelector("element-width-overflow-auto");
attach(scrollingElement);
```

### UMD

```js
const scrollingElement = document.querySelector("element-width-overflow-auto");
window.lightScrollbar.attach(scrollingElement);
```

<!-- For working example, check out [our demo](https://www.frsource.org/light-scrollbar). -->

## Questions

Don’t hesitate to ask a question directly on the [discussions board](https://github.com/FRSOURCE/light-scrollbar/discussions)!

## Changelog

Changes for every release are documented in the [release notes](https://github.com/FRSOURCE/light-scrollbar/releases) and [CHANGELOG file](https://github.com/FRSOURCE/light-scrollbar/tree/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Szymon Dziewoński, FRSOURCE
