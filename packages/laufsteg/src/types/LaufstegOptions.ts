import type { Cursor } from './Cursor';
import type { Gap } from './Gap';

export interface LaufstegOptions {
  /** Initial pixel-offset of the items. Positive values: scrolled to the right, negative values: scrolled to the left. */
  offset: number;

  /** Defines if the items are draggable by the user. */
  draggable: boolean;

  /** Speed of the automatic animation in px/s. Negative values mean it is sliding to left. Positive to the right. When set to 0, there is no movement.  */
  animationSpeed: number;

  /** Descibes the friction of the elements, after the user stopped dragging them. When given 1 it never stops. The higher the value, the faster it stops. */
  friction: number;

  /** Distance in px the scroll has to move horizontally until the vertical scroll lock activates*/
  scrollLockDistance: number;

  /** (Minimum) number of items on each side to make sure there is no blank space — even with fast dragging.  */
  overflowItems: number;

  /** Space between the cells. Either a CSS-Unit-String or a pixel count */
  gap: Gap;

  /** The cursor applied in the different states. When given a string, instead of an object it is used in every state. */
  cursor: Cursor;
}
