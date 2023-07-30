import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { rearrangeToPerfectPosition } from './rearrangeToPerfectPosition';
import { startCSSAnimation } from './startCSSAnimation';
import { startSwitchInterval } from './startSwitchInterval';

export const start = (laufsteg: InternalLaufsteg) => () => {
  rearrangeToPerfectPosition(laufsteg)();
  startCSSAnimation(laufsteg)();
  startSwitchInterval(laufsteg)();
};
