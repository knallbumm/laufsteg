import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { setOffsetToDOM } from './setOffsetToDOM';

export const setNewAnimationPosition = (laufsteg: InternalLaufsteg) => () => {
  // const directionalFactor = laufsteg.options.animationSpeed > 0 ? 1 : -1;
  const travel = laufsteg.options.animationSpeed * 60;

  laufsteg._internal.cssAnimationDestination =
    laufsteg._internal.savedDragOffset - travel;

  setOffsetToDOM(laufsteg)(laufsteg._internal.cssAnimationDestination);
};
