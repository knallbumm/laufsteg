import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { captureCurrentOffset } from './captureCurrentOffset';
import { removeCSSTransition } from './removeCSSTransition';
import { setOffsetToDOM } from './setOffsetToDOM';

export const stopCSSAnimation =
  (laufsteg: InternalLaufsteg) => (offset?: number) => {
    if (laufsteg._internal.state == 'CSS_ANIMATING') {
      if (offset === undefined) {
        captureCurrentOffset(laufsteg)();
      } else {
        laufsteg._internal.savedDragOffset = offset;
      }

      setOffsetToDOM(laufsteg)(laufsteg._internal.savedDragOffset);
      removeCSSTransition(laufsteg)();
      laufsteg._internal.cssAnimationDestination = 0;
    }
  };
