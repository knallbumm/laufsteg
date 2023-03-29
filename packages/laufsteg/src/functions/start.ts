import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { startCSSAnimation } from './startCSSAnimation';

export const start = (laufsteg: InternalLaufsteg) => () => {
  startCSSAnimation(laufsteg)();
};
