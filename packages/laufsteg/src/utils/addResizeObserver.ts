export function addResizeObserver(
  element: HTMLDivElement,
  callback: () => void
) {
  if (window && 'ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(element);
  } else {
    throw new Error(
      'It seems like ResizeObserver is not supported. Maybe you should add a polyfill'
    );
  }
}
