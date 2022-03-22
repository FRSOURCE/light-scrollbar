export const removeAllStylesWithPrefix = (el: HTMLElement, prefix: string) => {
  Array.from(el.style).forEach((v) => {
    if (v.startsWith(`--${prefix}-`)) {
      el.style.removeProperty(v);
    }
  });
};

export const removeAllClassesWithPrefix = (el: HTMLElement, className: string) => {
  el.classList.remove(...Array.from(el.classList).filter((v) => v.startsWith(className)));
};

export const restoreTabIndex = (el: HTMLElement, hadTabIndex: string | null) => {
  if (hadTabIndex) el.setAttribute("tabIndex", hadTabIndex);
  else el.removeAttribute("tabIndex");
};
