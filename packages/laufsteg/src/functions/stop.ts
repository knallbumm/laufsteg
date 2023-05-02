import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { stopCSSAnimation } from './stopCSSAnimation';
import { stopSwitchInterval } from './stopSwitchInterval';

export const stop = (laufsteg: InternalLaufsteg) => () => {
  stopCSSAnimation(laufsteg)();
  stopSwitchInterval(laufsteg)();
};
