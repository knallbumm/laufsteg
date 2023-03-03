export function extractContainer(container: HTMLDivElement): HTMLDivElement {
  if (!container) {
    throw new Error('No container given!');
  }

  return container;
}
