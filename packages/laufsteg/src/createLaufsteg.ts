import { Laufsteg } from './Laufsteg';
import type { LaufstegOptions } from './types';

export function createLaufsteg(
  container: HTMLDivElement,
  options: Partial<LaufstegOptions>
) {
  return new Laufsteg(container, options);
}
