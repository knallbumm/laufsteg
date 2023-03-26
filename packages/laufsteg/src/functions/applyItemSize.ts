import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { setTrolleySize } from '../utils/setTrolleySize';
import { cloneCellsWhenNeeded } from './cloneCellsWhenNeeded';

export const applyItemSize = (laufsteg: InternalLaufsteg) => () => {
  setTrolleySize(
    laufsteg._internal.domNodes.trolley,
    laufsteg._internal.cellSize
  );
  cloneCellsWhenNeeded(laufsteg)();
};
