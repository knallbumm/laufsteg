import type { Size } from '../types/Size';

export function getContainerSize(container: HTMLDivElement): Size {
  return { width: container.clientWidth, height: container.clientHeight };
}
