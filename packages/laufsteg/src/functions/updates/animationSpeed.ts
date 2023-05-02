import type { InternalLaufsteg } from '../../types/InternalLaufsteg';
import { startCSSAnimation } from '../startCSSAnimation';
import { stopCSSAnimation } from '../stopCSSAnimation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const animationSpeed = (laufsteg: InternalLaufsteg) => (value: any) => {
  stopCSSAnimation(laufsteg as InternalLaufsteg)();
  laufsteg._internal.options.animationSpeed = value;
  startCSSAnimation(laufsteg as InternalLaufsteg)();
};
