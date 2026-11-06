---
"@frsource/light-scrollbar": patch
---

Dragging one scrollbar thumb no longer scrolls the other axis to its end after the other thumb was dragged before (#531). Pressing a thumb right after moving the cursor onto it now starts dragging - rails hover state was computed from the previous mouse position.
