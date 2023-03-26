import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { setOffsetToDOM } from './setOffsetToDOM';

export const setNewAnimationPosition = (wrapper: LaufstegWrapper) => () => {
    console.log('BAP', wrapper.internal.cellSize);
  const directionalFactor =
    wrapper.laufsteg.options.animationSpeed > 0 ? 1 : -1;
  const travel = Math.ceil(wrapper.internal.cellSize.width * directionalFactor);

  wrapper.internal.cssAnimationDestination =
    wrapper.internal.savedDragOffset - travel;

  rearrangeCellsIfNeeded(wrapper)();
  setOffsetToDOM(wrapper)(wrapper.internal.cssAnimationDestination);
};
