---
"@frsource/light-scrollbar": minor
---

Added an optional rail - a background track under the scrollbar thumb. Turn it on with `enableRail: true` and pass the rail plugin: `import { rail } from "@frsource/light-scrollbar/rail"`, `plugins: [rail]`, plus `@frsource/light-scrollbar/dist/rail.css`. The rail is customizable like `bar` via the `rail` option, and every value that is not set is taken from `bar`. On top of the rail the default theme uses a darker thumb. The whole rail reacts to the mouse like the scrollbar, also when it is thicker than the thumb. The rail lives in a separate entry, so it is added to your bundle only when you import it.

The package now has an `exports` map. All existing import paths still resolve.
