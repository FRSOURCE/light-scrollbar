# attach

Method used to initialize plugin.

e.g
```ts
import { attach, WrapperPlacement } from "light-scrollbar";

const scrollbarContainerElement = document.querySelector(".my-scrollbar");
const { innerElement, outerElement, detach } = attach(scrollbarContainerElement, {
    wrapperPlacement: WrapperPlacement.outside
});
```

More API details:
* [attach arguments](/api/attach/arguments)
* [attach returns](/api/attach/returns)
* [detach](/api/detach)
