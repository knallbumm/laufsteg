import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { stopCSSAnimation } from './stopCSSAnimation';

export const stop = (laufsteg: InternalLaufsteg) => () => {
  stopCSSAnimation(laufsteg)();
};
