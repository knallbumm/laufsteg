import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { setTrolleySize } from '../utils/setTrolleySize';
import { cloneCellsWhenNeeded } from './cloneCellsWhenNeeded';

export const applyItemSize = (wrapper: LaufstegWrapper) => () => {
  setTrolleySize(wrapper.internal.domNodes.trolley, wrapper.internal.cellSize);
  cloneCellsWhenNeeded(wrapper)();
};
