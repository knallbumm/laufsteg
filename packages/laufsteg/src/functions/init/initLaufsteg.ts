import type { LaufstegOptions } from '../../types';
import type { Laufsteg } from '../../types/Laufsteg';

export function initLaufsteg(options: LaufstegOptions): Laufsteg {
  return { options, callbacks: {} };
}
