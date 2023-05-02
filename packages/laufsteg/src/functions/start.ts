import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { rearrangeToPerfectPosition } from './rearrangeToPerfectPosition';
import { startCSSAnimation } from './startCSSAnimation';
import { startSwitchInterval } from './startSwitchInterval';

export const start = (laufsteg: InternalLaufsteg) => () => {
  startCSSAnimation(laufsteg)();
  rearrangeToPerfectPosition(laufsteg)();
  startSwitchInterval(laufsteg)();
};
