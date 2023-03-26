import type { DomNodes } from './DomNodes';
import type { Size } from './Size';

export interface LaufstegInternal {
  domNodes: DomNodes;
  state?: 'CSS_ANIMATING' | 'DECLERATING' | 'DRAGGING';
  containerSize: Size;
  cellSize: Size;
  cellPositions: number[];
  savedDragOffset: number;
  currentDragStartX?: number;
  currentDragTravel?: number;
  dragReleaseSpeed: number;
  cssAnimationDestination: number;
  lastSpeeds: number[];
  lastMoveTimestamp: number;
  decelerationStart: number | undefined;
  lastDelecerationFrameTimestamp: number | undefined;
  runningInterval?: number;
}
