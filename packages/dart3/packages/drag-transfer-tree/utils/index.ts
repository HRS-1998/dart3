export const isCtrlPressed = (event: MouseEvent | KeyboardEvent) => {
  return event.ctrlKey || event.metaKey;
};

export const isShiftPressed = (event: MouseEvent | KeyboardEvent) => {
  return event.shiftKey;
};
