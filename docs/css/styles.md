# Styles

Colors and radius of the scrollbar and the [rail](/examples/rail) are CSS variables. Their defaults come with the light-scrollbar styles (`index.css`, `rail.css`), so you don't have to set anything - override only what you want to change. Set them on the scrollbar element, on any of its parents, or on `:root` for every scrollbar on the page:

```css
.my-scrollbar {
  --light-scrollbar-bar-background: #8b5cf6;
  --light-scrollbar-bar-background-active: #6d28d9;
  --light-scrollbar-bar-radius: 2px;
}
```

The defaults are declared on `:where(:root)` - with zero specificity - so your own declarations always win, also on `:root`, no matter in which order the stylesheets are loaded.

## CSS variables

From `index.css`:

| Variable | Default | Used for |
|---|---|---|
| `--light-scrollbar-bar-background` | `#cbd5e1` | scrollbar thumb |
| `--light-scrollbar-bar-background-active` | `#94a3b8` | scrollbar thumb when hovered or dragged |
| `--light-scrollbar-bar-radius` | `12px` | scrollbar thumb `border-radius` |

From `rail.css`, used only by scrollbars with the [rail](/examples/rail) on:

| Variable | Default | Used for |
|---|---|---|
| `--light-scrollbar-rail-background` | `#f1f5f9` | rail |
| `--light-scrollbar-rail-radius` | `8px` | rail `border-radius` |
| `--light-scrollbar-rail-bar-background` | `#94a3b8` | scrollbar thumb on top of the rail - instead of `--light-scrollbar-bar-background` |
| `--light-scrollbar-rail-bar-background-active` | `#64748b` | scrollbar thumb on top of the rail when hovered or dragged - instead of `--light-scrollbar-bar-background-active` |

On top of the rail the thumb has its own, darker colors, so it stays visible on the rail. `--light-scrollbar-bar-radius` is used with and without the rail.

```css
/* scrollbar with the rail */
.my-scrollbar {
  --light-scrollbar-rail-background: #ede9fe;
  --light-scrollbar-rail-radius: 0;
  --light-scrollbar-rail-bar-background: #8b5cf6;
  --light-scrollbar-rail-bar-background-active: #6d28d9;
}
```

::: warning
Variables starting with `--ls-` (e.g. `--ls-bar-y-height`) are set by the plugin itself to position the scrollbar and are removed on `detach()`. Don't set them yourself.
:::

## Other styles

Everything that has no variable (e.g. `opacity`, `border`, `box-shadow`) is styled with your own rules - see the [CustomStyles example](/examples/customStyles):

| Element | Selector |
|---|---|
| x scrollbar thumb | `.light-scrollbar-wrapper-outside::before` |
| y scrollbar thumb | `.light-scrollbar-wrapper-outside::after` |
| x rail | `.light-scrollbar-wrapper-inside.light-scrollbar-rail::before` |
| y rail | `.light-scrollbar-wrapper-inside.light-scrollbar-rail::after` |
| hovered / dragged thumb | `.hover-x` / `.hover-y`, `.active-x` / `.active-y` on the outer element |

`light-scrollbar` in the class names is the [`className`](/api/attach/arguments#classname) option.
