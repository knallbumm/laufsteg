import type { LaufstegOptions } from '../../types';
import type { InternalLaufsteg } from '../../types/InternalLaufsteg';
import { initInternal } from './initInternal';

export function initLaufsteg(
  options: LaufstegOptions,
  container: HTMLDivElement
): InternalLaufsteg {
  return { options, callbacks: {}, _internal: initInternal(container) };
}
