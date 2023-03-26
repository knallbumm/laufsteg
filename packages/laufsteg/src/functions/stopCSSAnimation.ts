import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { captureCurrentOffset } from './captureCurrentOffset';
import { removeCSSTransition } from './removeCSSTransition';
import { setOffsetToDOM } from './setOffsetToDOM';

export const stopCSSAnimation =
  (wrapper: LaufstegWrapper) => (offset?: number) => {
    if (wrapper.internal.state == 'CSS_ANIMATING') {
      if (offset === undefined) {
        captureCurrentOffset(wrapper)();
      } else {
        wrapper.internal.savedDragOffset = offset;
      }

      setOffsetToDOM(wrapper)(wrapper.internal.savedDragOffset);
      removeCSSTransition(wrapper)();
      wrapper.internal.cssAnimationDestination = 0;
    }
  };
