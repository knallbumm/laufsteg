import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { getOffset } from '../utils/getOffset';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { resetDecelerating } from './resetDecelerating';
import { setOffsetToDOM } from './setOffsetToDOM';
import { startCSSAnimation } from './startCSSAnimation';

export const beginDeceleration =
  (laufsteg: InternalLaufsteg) => (frameTimestamp: number) => {
    let delta = 20; // TODO: Find better implementation for this random value
    if (laufsteg._internal.lastDelecerationFrameTimestamp) {
      delta =
        frameTimestamp - laufsteg._internal.lastDelecerationFrameTimestamp;
    } else {
      laufsteg._internal.decelerationStart = performance.now();
    }
    laufsteg._internal.lastDelecerationFrameTimestamp = frameTimestamp;

    const finalSpeed = !laufsteg._internal.currentDragTravel
      ? laufsteg.options.animationSpeed
      : 0;

    const progress =
      (frameTimestamp -
        (laufsteg._internal.decelerationStart ?? frameTimestamp)) *
      0.05;

    let currentSpeed = 0;

    const releasedFasterThanAnimation =
      Math.abs(laufsteg._internal.dragReleaseSpeed) >
      Math.abs(laufsteg.options.animationSpeed);
    if (releasedFasterThanAnimation) {
      currentSpeed =
        laufsteg._internal.dragReleaseSpeed *
          Math.pow(0.99, progress * laufsteg.options.friction) +
        finalSpeed;
    } else {
      const safeReleaseSpeed =
        laufsteg._internal.dragReleaseSpeed != 0 &&
        !isNaN(laufsteg._internal.dragReleaseSpeed)
          ? laufsteg._internal.dragReleaseSpeed
          : 1;
      currentSpeed =
        safeReleaseSpeed *
        0.1 *
        Math.pow(progress * laufsteg.options.friction, 3);
    }
    const pixelTravel = currentSpeed / (1000 / delta);

    setOffsetToDOM(laufsteg)(
      (laufsteg._internal.savedDragOffset -= pixelTravel)
    );

    const numberOfItemsToSwitch = Math.ceil(
      Math.abs(pixelTravel) / laufsteg._internal.cellSize.width
    );

    for (let i = 0; i < numberOfItemsToSwitch; i++) {
      rearrangeCellsIfNeeded(laufsteg)();
    }

    if (laufsteg._internal.state == 'DECLERATING') {
      if (
        Math.abs(currentSpeed) >
          1 + Math.abs(laufsteg.options.animationSpeed) &&
        releasedFasterThanAnimation
      ) {
        window.requestAnimationFrame((time) => {
          beginDeceleration(laufsteg)(time);
        });
      } else if (
        Math.abs(currentSpeed) + 1 <
          Math.abs(laufsteg.options.animationSpeed) &&
        !releasedFasterThanAnimation
      ) {
        window.requestAnimationFrame((time) => {
          beginDeceleration(laufsteg)(time);
        });
      } else {
        resetDecelerating(laufsteg)();
        startCSSAnimation(laufsteg)();
        laufsteg.callbacks.onDecelerationEnd?.(getOffset(laufsteg));
      }
    } else {
      resetDecelerating(laufsteg)();
    }
  };
