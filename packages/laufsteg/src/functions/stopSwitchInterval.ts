import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const stopSwitchInterval = (laufsteg: InternalLaufsteg) => () => {
  if (!laufsteg._internal.runningInterval) {
    return;
  }

  window.clearInterval(laufsteg._internal.runningInterval);
  laufsteg._internal.runningInterval = undefined;
};
