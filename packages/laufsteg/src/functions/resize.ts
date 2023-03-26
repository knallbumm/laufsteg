import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { getContainerSize } from '../utils/getContainerSize';
import { rebuild } from './rebuild';

export const resize = (wrapper: LaufstegWrapper) => () => {
  const oldSize = wrapper.internal.containerSize;
  wrapper.internal.containerSize = getContainerSize(
    wrapper.internal.domNodes.container
  );

  //TODO: Real resizing
  if (oldSize.width != wrapper.internal.containerSize.width) {
    rebuild(wrapper)();
  }
};
