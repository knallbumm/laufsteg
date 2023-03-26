import { stopCSSAnimation } from '../functions/stopCSSAnimation';
import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export function stop(laufsteg: InternalLaufsteg) {
  stopCSSAnimation(laufsteg)();
}
