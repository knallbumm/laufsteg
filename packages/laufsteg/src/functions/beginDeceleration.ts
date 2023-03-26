import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { getOffset } from '../utils/getOffset';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { resetDecelerating } from './resetDecelerating';
import { setOffsetToDOM } from './setOffsetToDOM';
import { startCSSAnimation } from './startCSSAnimation';

export const beginDeceleration =
  (wrapper: LaufstegWrapper) => (frameTimestamp: number) => {
    let delta = 20; // TODO: Find better implementation for this random value
    if (wrapper.internal.lastDelecerationFrameTimestamp) {
      delta = frameTimestamp - wrapper.internal.lastDelecerationFrameTimestamp;
    } else {
      wrapper.internal.decelerationStart = performance.now();
    }
    wrapper.internal.lastDelecerationFrameTimestamp = frameTimestamp;

    const finalSpeed = !wrapper.internal.currentDragTravel
      ? wrapper.laufsteg.options.animationSpeed
      : 0;

    const progress =
      (frameTimestamp -
        (wrapper.internal.decelerationStart ?? frameTimestamp)) *
      0.05;

    let currentSpeed = 0;

    const releasedFasterThanAnimation =
      Math.abs(wrapper.internal.dragReleaseSpeed) >
      Math.abs(wrapper.laufsteg.options.animationSpeed);
    if (releasedFasterThanAnimation) {
      currentSpeed =
        wrapper.internal.dragReleaseSpeed *
          Math.pow(0.99, progress * wrapper.laufsteg.options.friction) +
        finalSpeed;
    } else {
      const safeReleaseSpeed =
        wrapper.internal.dragReleaseSpeed != 0 &&
        !isNaN(wrapper.internal.dragReleaseSpeed)
          ? wrapper.internal.dragReleaseSpeed
          : 1;
      currentSpeed =
        safeReleaseSpeed *
        0.1 *
        Math.pow(progress * wrapper.laufsteg.options.friction, 3);
    }
    const pixelTravel = currentSpeed / (1000 / delta);

    setOffsetToDOM(wrapper)((wrapper.internal.savedDragOffset -= pixelTravel));

    const numberOfItemsToSwitch = Math.ceil(
      Math.abs(pixelTravel) / wrapper.internal.cellSize.width
    );

    for (let i = 0; i < numberOfItemsToSwitch; i++) {
      rearrangeCellsIfNeeded(wrapper)();
    }

    if (wrapper.internal.state == 'DECLERATING') {
      if (
        Math.abs(currentSpeed) >
          1 + Math.abs(wrapper.laufsteg.options.animationSpeed) &&
        releasedFasterThanAnimation
      ) {
        window.requestAnimationFrame((time) => {
          beginDeceleration(wrapper)(time);
        });
      } else if (
        Math.abs(currentSpeed) + 1 <
          Math.abs(wrapper.laufsteg.options.animationSpeed) &&
        !releasedFasterThanAnimation
      ) {
        window.requestAnimationFrame((time) => {
          beginDeceleration(wrapper)(time);
        });
      } else {
        resetDecelerating(wrapper)();
        startCSSAnimation(wrapper)();
        wrapper.laufsteg.callbacks.onDecelerationEnd?.(getOffset(wrapper));
      }
    } else {
      resetDecelerating(wrapper)();
    }
  };
