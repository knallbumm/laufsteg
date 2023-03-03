import type { Size } from '../types/Size';

export function setTrolleySize(trolley: HTMLDivElement, size: Size) {
  trolley.style.height = `${size.height}px`;
  trolley.style.width = `${size.width}px`;
}
