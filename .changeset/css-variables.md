---
"@frsource/light-scrollbar": minor
---

Scrollbar and rail colors and radius are now CSS variables: `--light-scrollbar-bar-background`, `--light-scrollbar-bar-background-active`, `--light-scrollbar-bar-radius`, and with the rail `--light-scrollbar-rail-background`, `--light-scrollbar-rail-radius`, `--light-scrollbar-rail-bar-background`, `--light-scrollbar-rail-bar-background-active`. Their defaults are included in `index.css` / `rail.css` (on `:where(:root)`, zero specificity) - override only the ones you want to change, on `:root`, the scrollbar element or any of its parents. The default look doesn't change. See the new _CSS → Styles_ docs page.
