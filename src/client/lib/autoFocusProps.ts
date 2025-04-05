type AutoFocusPropsReturn =
  | undefined
  | {
      autoFocus: true;
      "data-autofocus": true;
    };

export function autoFocusProps(): AutoFocusPropsReturn {
  return window.matchMedia("(min-width: 75em)").matches
    ? {
        autoFocus: true,
        "data-autofocus": true,
      }
    : undefined;
}
