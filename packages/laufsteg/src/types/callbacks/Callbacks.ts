import type { OnDecelerationEnd } from './OnDecelerationEnd';
import type { OnDecelerationStart } from './OnDecelerationStart';
import type { OnDragEnd } from './OnDragEnd';
import type { OnDragStart } from './OnDragStart';

export interface Callbacks {
  onDragStart: OnDragStart;
  onDragEnd: OnDragEnd;
  onDecelerationStart: OnDecelerationStart;
  onDecelerationEnd: OnDecelerationEnd;
}
