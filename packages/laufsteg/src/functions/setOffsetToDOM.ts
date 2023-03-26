import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const setOffsetToDOM =
  (wrapper: LaufstegWrapper) => (offset: number) => {
    if (wrapper.internal.domNodes.trolley) {
      wrapper.internal.domNodes.trolley.style.setProperty(
        '--trolley-offset',
        `${offset}px`
      );
    }
  };
