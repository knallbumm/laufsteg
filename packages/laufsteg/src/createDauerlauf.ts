import { Dauerlauf } from './Dauerlauf';
import type { DauerlaufOptions } from './types';

export function createDauerlauf(
  container: HTMLDivElement,
  options: Partial<DauerlaufOptions>
) {
  return new Dauerlauf(container, options);
}
