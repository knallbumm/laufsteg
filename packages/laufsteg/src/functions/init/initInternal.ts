import type { LaufstegOptions } from '../../types';
import type { LaufstegInternal } from '../../types/LaufstegInternal';
import { parseDomNodes } from '../../utils/parseDomNodes';

export function initInternal(
  container: HTMLDivElement,
  options: LaufstegOptions
): LaufstegInternal {
  return {
    domNodes: parseDomNodes(container),
    state: undefined,
    containerSize: { width: 0, height: 0 },
    cellSize: { width: 0, height: 0 },
    cellPositions: [],
    savedDragOffset: 0,
    currentDragStartX: undefined,
    currentDragTravel: undefined,
    dragReleaseSpeed: 0,
    cssAnimationDestination: 0,
    lastSpeeds: [],
    lastMoveTimestamp: 0,
    decelerationStart: undefined,
    lastDelecerationFrameTimestamp: undefined,
    options: options,
  };
}
