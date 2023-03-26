import { cloneCellsWhenNeeded } from '../functions/cloneCellsWhenNeeded';
import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { setTrolleySize } from './setTrolleySize';

export const applyItemSize = (wrapper: LaufstegWrapper) => () => {
  setTrolleySize(wrapper.internal.domNodes.trolley, wrapper.internal.cellSize);
  cloneCellsWhenNeeded(wrapper)();
  console.log("DDDDD")
};
