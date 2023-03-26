import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { draggingEnded } from './draggingEnded';
import { draggingMoved } from './draggingMoved';
import { draggingStarted } from './draggingStarted';
import { resize } from './resize';
import { setNewAnimationPosition } from './setNewAnimationPosition';

export function addEventListeners(wrapper: LaufstegWrapper) {
  wrapper.internal.domNodes.container.addEventListener(
    'mousedown',
    draggingStarted(wrapper)
  );
  wrapper.internal.domNodes.container.addEventListener(
    'touchstart',
    draggingStarted(wrapper)
  );

  window.addEventListener('mousemove', draggingMoved(wrapper));
  window.addEventListener('touchmove', draggingMoved(wrapper));

  window.addEventListener('mouseup', draggingEnded(wrapper));
  window.addEventListener('touchend', draggingEnded(wrapper));
  wrapper.internal.domNodes.trolley.addEventListener(
    'touchcancel',
    draggingEnded(wrapper)
  );

  wrapper.internal.domNodes.trolley.addEventListener('transitionend', () => {
    wrapper.internal.savedDragOffset = wrapper.internal.cssAnimationDestination;
    setNewAnimationPosition(wrapper)();
  });

  window.addEventListener('resize', resize(wrapper));
}
