import { wrappedPromise } from "./wrappedPromise";

export const addElements = (appendToElement: HTMLElement, itemCount: number) =>
  wrappedPromise(
    "addElements",
    () =>
      new Promise((resolve) => {
        for (let i = 0; i <= itemCount; ++i) {
          const element = document.createTextNode(`Additional items dynamically appended ${i}`);
          const br = document.createElement("br");

          appendToElement.prepend(element, br);
          if (i === itemCount) resolve(true);
        }
      })
  );
