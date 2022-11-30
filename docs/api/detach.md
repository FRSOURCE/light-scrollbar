# detach

Method that is returned from initialized `attach` method. It can be used to unwrap scrollbar list in DOM and remove all handlers from elements.

e.g
```ts{10}
import { attach, WrapperPlacement } from "light-scrollbar";

const scrollbarContainerElement = document.querySelector(".my-scrollbar");
const { innerElement, outerElement, detach } = attach(scrollbarContainerElement, {
    wrapperPlacement: WrapperPlacement.outside
});

// remove/detach whole plugin from element on some action
document.querySelector('.click-to-remove-plugin').addEventListener(() => {
    detach();
});
```
More API details:
* [attach arguments](/api/attach/arguments)
* [attach returns](/api/attach/returns)
