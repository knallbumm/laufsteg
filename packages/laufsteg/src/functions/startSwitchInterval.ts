import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { captureCurrentOffset } from './captureCurrentOffset';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';

export const startSwitchInterval = (laufsteg: InternalLaufsteg) => () => {
  if (laufsteg._internal.runningInterval) {
    return;
  }

  const animationDuration =
    laufsteg._internal.cellSize.width /
    Math.abs(laufsteg.options.animationSpeed);

  // uses window to fix type error with react
  laufsteg._internal.runningInterval = window.setInterval(() => {
    captureCurrentOffset(laufsteg)();
    rearrangeCellsIfNeeded(laufsteg)();
  }, animationDuration * 1000);
};
