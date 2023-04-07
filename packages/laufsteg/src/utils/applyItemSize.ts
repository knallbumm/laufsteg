import { cloneCellsWhenNeeded } from '../functions/cloneCellsWhenNeeded';
import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const applyItemSize = (laufsteg: InternalLaufsteg) => () => {
  cloneCellsWhenNeeded(laufsteg)();
};
