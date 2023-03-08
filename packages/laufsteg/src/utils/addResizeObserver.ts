export function addResizeObserver(
  element: HTMLDivElement,
  callback: () => void
): ResizeObserver {
  if (window && 'ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length == 1 && entries[0].contentRect.width != 0) {
        callback();
      }
    });
    resizeObserver.observe(element);
    return resizeObserver;
  } else {
    throw new Error(
      'It seems like ResizeObserver is not supported. Maybe you should add a polyfill'
    );
  }
}
