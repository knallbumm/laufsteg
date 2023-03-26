import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { getContainerSize } from '../utils/getContainerSize';
import { rebuild } from './rebuild';

export const resize = (laufsteg: InternalLaufsteg) => () => {
  const oldSize = laufsteg._internal.containerSize;
  laufsteg._internal.containerSize = getContainerSize(
    laufsteg._internal.domNodes.container
  );

  //TODO: Real resizing
  if (oldSize.width != laufsteg._internal.containerSize.width) {
    rebuild(laufsteg)();
  }
};
