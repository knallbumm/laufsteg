import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { draggingEnded } from './draggingEnded';
import { draggingMoved } from './draggingMoved';
import { draggingStarted } from './draggingStarted';
import { resize } from './resize';
import { setNewAnimationPosition } from './setNewAnimationPosition';

export function addEventListeners(laufsteg: InternalLaufsteg) {
  laufsteg._internal.domNodes.container.addEventListener(
    'mousedown',
    draggingStarted(laufsteg)
  );
  laufsteg._internal.domNodes.container.addEventListener(
    'touchstart',
    draggingStarted(laufsteg)
  );

  window.addEventListener('mousemove', draggingMoved(laufsteg), {
    passive: false,
  });
  window.addEventListener('touchmove', draggingMoved(laufsteg), {
    passive: false,
  });

  window.addEventListener('mouseup', draggingEnded(laufsteg)),
    {
      passive: false,
    };
  window.addEventListener('touchend', draggingEnded(laufsteg), {
    passive: false,
  });
  laufsteg._internal.domNodes.trolley.addEventListener(
    'touchcancel',
    draggingEnded(laufsteg),
    {
      passive: false,
    }
  );

  laufsteg._internal.domNodes.trolley.addEventListener('transitionend', () => {
    laufsteg._internal.savedDragOffset =
      laufsteg._internal.cssAnimationDestination;
    setNewAnimationPosition(laufsteg)();
  });

  window.addEventListener('resize', resize(laufsteg));
}
