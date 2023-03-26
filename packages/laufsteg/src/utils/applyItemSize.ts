import { cloneCellsWhenNeeded } from '../functions/cloneCellsWhenNeeded';
import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { setTrolleySize } from './setTrolleySize';

export const applyItemSize = (laufsteg: InternalLaufsteg) => () => {
  setTrolleySize(
    laufsteg._internal.domNodes.trolley,
    laufsteg._internal.cellSize
  );
  cloneCellsWhenNeeded(laufsteg)();
};
