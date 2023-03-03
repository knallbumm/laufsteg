import type { Direction } from './Direction';

export interface LaufstegOptions {
  direction: Direction;
  draggable: boolean;
  preserveDirectionAfterDraging: boolean;
  speed: number;
  initialOffset: number;

  changeCursor: boolean;
}
