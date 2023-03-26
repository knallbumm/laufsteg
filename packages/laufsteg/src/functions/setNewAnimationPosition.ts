import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { setOffsetToDOM } from './setOffsetToDOM';

export const setNewAnimationPosition = (laufsteg: InternalLaufsteg) => () => {
  const directionalFactor = laufsteg.options.animationSpeed > 0 ? 1 : -1;
  const travel = Math.ceil(
    laufsteg._internal.cellSize.width * directionalFactor
  );

  laufsteg._internal.cssAnimationDestination =
    laufsteg._internal.savedDragOffset - travel;

  rearrangeCellsIfNeeded(laufsteg)();
  setOffsetToDOM(laufsteg)(laufsteg._internal.cssAnimationDestination);
};
