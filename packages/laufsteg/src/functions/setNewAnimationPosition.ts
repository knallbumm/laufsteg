import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { setOffsetToDOM } from './setOffsetToDOM';

export const setNewAnimationPosition = (laufsteg: InternalLaufsteg) => () => {
  const travel = laufsteg._internal.options.animationSpeed * 60;

  laufsteg._internal.cssAnimationDestination =
    laufsteg._internal.savedDragOffset - travel;

  setOffsetToDOM(laufsteg)(laufsteg._internal.cssAnimationDestination);
};
