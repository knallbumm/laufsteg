import { startCSSAnimation } from '../functions/startCSSAnimation';
import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export function start(laufsteg: InternalLaufsteg) {
  startCSSAnimation(laufsteg)();
}
