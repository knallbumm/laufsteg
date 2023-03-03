import type { DauerlaufOptions } from './types';
import type { Cells } from './types/Cells';
import type { Size } from './types/Size';
import { calculateNumberOfNeededCells } from './utils/calculateNumberOfNeededCells';
import { calculateOverdoses } from './utils/calculateOverdoses';
import { extractCells } from './utils/extractCells';
import { extractContainer } from './utils/extractContainer';
import { extractTrolley } from './utils/extractTrolley';
import { fillUpCells } from './utils/fillUpCells';
import { findMaxPositions } from './utils/findMaxPositons';
import { getCellPixelSize } from './utils/getCellPixelSize';
import { getContainerSize } from './utils/getContainerSize';
import { getEventXPosition } from './utils/getEventXPosition';
import { prepareCellPositions } from './utils/prepareCellPositions';
import { setPositionsToCells as applyCellPositions } from './utils/setPositionsToCells';
import { setTrolleySize } from './utils/setTrolleySize';

export class Dauerlauf {
  private DOM_NODES: {
    container: HTMLDivElement;
    trolley: HTMLDivElement;
    cells: Cells;
  };

  private OPTIONS: DauerlaufOptions;

  private STATE?: 'CSS_ANIMATING' | 'DECLERATING' | 'DRAGGING' = undefined;

  private CONTAINER_SIZE: Size;
  private CELL_SIZE: Size;

  private CELL_POSITITIONS: number[] = [];

  private ABSOLUTE_DRAG_OFFSET = 0;

  private CURRENT_DRAG_START_X?: number = undefined;
  private CURRENT_DRAG_OFFSET?: number = undefined;

  private DRAG_RELEASE_SPEED = 0;

  private NEXT_ANIMATION_STEP = 0;

  private LAST_KNOWN_SPEEDS: number[] = [];

  private LAST_MOVE_TIMESTAMP = 0;

  private DECELERATION_START: number | undefined = undefined;
  private PREVIOUSE_TIMESTAMP: number | undefined = undefined;

  constructor(container: HTMLDivElement, options: Partial<DauerlaufOptions>) {
    this.OPTIONS = {
      offset: options.offset ?? 0,
      draggable: options.draggable ?? true,
      animationSpeed: options.animationSpeed ?? 100,
      friction: options.friction ?? 8,
      overflowItems: options.overflowItems ?? 1,
      cursor: options.cursor ?? {
        hover: 'grab',
        dragging: 'grabbing',
      },
    };

    const trolley = extractTrolley(container);
    this.DOM_NODES = {
      container: extractContainer(container),
      trolley,
      cells: extractCells(trolley),
    };

    // Sizes the trolley based on the first cell
    const firstCell = this.DOM_NODES.cells[0];
    this.CELL_SIZE = getCellPixelSize(firstCell);
    setTrolleySize(this.DOM_NODES.trolley, this.CELL_SIZE);

    this.CONTAINER_SIZE = getContainerSize(container);

    this.cloneCellsWhenNeeded();

    applyCellPositions(this.DOM_NODES.cells, this.CELL_POSITITIONS);

    this.addEventListeners();

    this.start();
  }

  public start() {
    this.startCSSAnimation();
  }

  public stop() {
    this.stopCSSAnimation();
  }

  get animating() {
    return this.STATE == 'CSS_ANIMATING';
  }

  private addEventListeners() {
    this.DOM_NODES.container.addEventListener(
      'mousedown',
      this.draggingStarted
    );
    this.DOM_NODES.container.addEventListener(
      'touchstart',
      this.draggingStarted
    );

    window.addEventListener('mousemove', this.draggingMoved);
    window.addEventListener('touchmove', this.draggingMoved);

    window.addEventListener('mouseup', this.draggingEnded);
    window.addEventListener('touchend', this.draggingEnded);
    this.DOM_NODES.trolley.addEventListener('touchcancel', this.draggingEnded);

    this.DOM_NODES.trolley.addEventListener('transitionend', () => {
      this.ABSOLUTE_DRAG_OFFSET = this.NEXT_ANIMATION_STEP;
      this.startCSSAnimation();
    });

    window.addEventListener('resize', () => this.resize());
  }

  private draggingStarted = (event: MouseEvent | TouchEvent) => {
    if (!this.OPTIONS.draggable) {
      return;
    }

    this.stopCSSAnimation();
    this.STATE = 'DRAGGING';
    this.resetDecelerating();

    this.CURRENT_DRAG_START_X = getEventXPosition(event);
    this.LAST_MOVE_TIMESTAMP = performance.now();
  };

  private draggingMoved = (event: MouseEvent | TouchEvent) => {
    const isCurrentlyDragging =
      this.CURRENT_DRAG_START_X != undefined && this.STATE == 'DRAGGING';

    if (!isCurrentlyDragging) {
      return;
    }

    const timeDeltaSinceLastMove = performance.now() - this.LAST_MOVE_TIMESTAMP;

    const lastMoveDragOffset = this.CURRENT_DRAG_OFFSET ?? 0;
    const dragXPosition = getEventXPosition(event);
    this.CURRENT_DRAG_OFFSET = dragXPosition - (this.CURRENT_DRAG_START_X ?? 0);

    this.LAST_MOVE_TIMESTAMP = performance.now();

    const travelSinceLastMove = lastMoveDragOffset - this.CURRENT_DRAG_OFFSET;

    this.logSpeed(timeDeltaSinceLastMove, travelSinceLastMove);

    this.setOffsetToDOM(this.offset);

    this.rearrangeCellsIfNeeded();
  };

  private draggingEnded = () => {
    this.ABSOLUTE_DRAG_OFFSET += this.CURRENT_DRAG_OFFSET ?? 0;

    this.setOffsetToDOM(this.ABSOLUTE_DRAG_OFFSET);

    const dragReleaseSpeed = this.getSpeedAvg();
    this.setAnimationDirection(dragReleaseSpeed);
    this.DRAG_RELEASE_SPEED = dragReleaseSpeed;

    this.resetDrag();

    this.STATE = 'DECLERATING';

    this.beginDeceleration(performance.now());
  };

  private setOffsetToDOM(offset: number) {
    if (this.DOM_NODES.trolley) {
      this.DOM_NODES.trolley.style.transform = `translateX(${offset}px)`;
    }
  }

  private rearrangeCellsIfNeeded() {
    const { min, max, indexOfMin, indexOfMax } = findMaxPositions(
      this.CELL_POSITITIONS
    );

    const { leftOverdose, rightOverdose } = calculateOverdoses({
      offset: this.offset,
      min,
      cellSize: this.CELL_SIZE,
      containerSize: this.CONTAINER_SIZE,
      numberOfCells: this.CELL_POSITITIONS.length,
    });

    if (rightOverdose > leftOverdose) {
      const difference = rightOverdose - leftOverdose;
      const correctedDifference = Math.abs(
        rightOverdose -
          this.CELL_SIZE.width -
          (leftOverdose + this.CELL_SIZE.width)
      );

      if (correctedDifference < difference) {
        this.CELL_POSITITIONS[indexOfMax] = min - 100;
        applyCellPositions(this.DOM_NODES.cells, this.CELL_POSITITIONS);
      }
    } else if (leftOverdose > rightOverdose) {
      const difference = leftOverdose - rightOverdose;
      const correctedDifference = Math.abs(
        leftOverdose -
          this.CELL_SIZE.width -
          (rightOverdose + this.CELL_SIZE.width)
      );

      if (correctedDifference < difference) {
        this.CELL_POSITITIONS[indexOfMin] = max + 100;
        applyCellPositions(this.DOM_NODES.cells, this.CELL_POSITITIONS);
      }
    }
  }

  private beginDeceleration(newTime: number) {
    let delta = 20; // TODO: Find better implementation for this random value
    if (this.PREVIOUSE_TIMESTAMP) {
      delta = newTime - this.PREVIOUSE_TIMESTAMP;
    } else {
      this.DECELERATION_START = performance.now();
    }
    this.PREVIOUSE_TIMESTAMP = newTime;

    const finalSpeed = !this.CURRENT_DRAG_OFFSET
      ? this.OPTIONS.animationSpeed
      : 0;

    const progress = (newTime - (this.DECELERATION_START ?? newTime)) * 0.05;

    const currentSpeed =
      this.DRAG_RELEASE_SPEED *
        Math.pow(0.99, progress * this.OPTIONS.friction) +
      finalSpeed;

    const pixelTravel = currentSpeed / (1000 / delta);

    this.setOffsetToDOM((this.ABSOLUTE_DRAG_OFFSET -= pixelTravel));

    this.rearrangeCellsIfNeeded();

    if (this.STATE == 'DECLERATING') {
      if (Math.abs(currentSpeed) > 1 + Math.abs(this.OPTIONS.animationSpeed)) {
        window.requestAnimationFrame((time) => {
          this.beginDeceleration(time);
        });
      } else {
        this.resetDecelerating();
        this.startCSSAnimation();
      }
    } else {
      this.resetDecelerating();
    }
  }

  private startCSSAnimation() {
    // TODO: Handle state when is decelerating
    this.STATE = 'CSS_ANIMATING';

    this.NEXT_ANIMATION_STEP =
      this.ABSOLUTE_DRAG_OFFSET - this.OPTIONS.animationSpeed;
    this.addCSSTransition();
    this.setOffsetToDOM(this.NEXT_ANIMATION_STEP);

    this.rearrangeCellsIfNeeded();
  }

  private stopCSSAnimation() {
    if (this.STATE == 'CSS_ANIMATING') {
      this.captureCurrentOffset();
      this.setOffsetToDOM(this.ABSOLUTE_DRAG_OFFSET);
      this.removeCSSTransition();
    }
  }

  private addCSSTransition() {
    if (!this.DOM_NODES.trolley) {
      return;
    }
    this.DOM_NODES.trolley.style.transition = `all 1s linear`;
  }

  private removeCSSTransition() {
    if (!this.DOM_NODES.trolley) {
      return;
    }
    this.DOM_NODES.trolley.style.transition = `none`;
  }

  private captureCurrentOffset() {
    if (!this.DOM_NODES.trolley) {
      throw new Error(
        'Cannot capture current offset because there is no trolley'
      );
    }

    const clientRect = this.DOM_NODES.trolley?.getBoundingClientRect();
    this.ABSOLUTE_DRAG_OFFSET = clientRect.x;
  }

  private logSpeed(
    timeDeltaSinceLastMove: number,
    travelSinceLastMove: number
  ) {
    const speedSinceLastMove = Math.round(
      (travelSinceLastMove / timeDeltaSinceLastMove) * 1000
    );
    this.LAST_KNOWN_SPEEDS.push(speedSinceLastMove);

    if (this.LAST_KNOWN_SPEEDS.length > 5) {
      this.LAST_KNOWN_SPEEDS.shift();
    }
  }

  private resetDecelerating() {
    this.DRAG_RELEASE_SPEED = 0;
    this.DECELERATION_START = undefined;
    this.PREVIOUSE_TIMESTAMP = undefined;
  }

  private cloneCellsWhenNeeded() {
    const numberOfNeededCells =
      calculateNumberOfNeededCells(this.CELL_SIZE, this.CONTAINER_SIZE) +
      this.OPTIONS.overflowItems * 2;

    fillUpCells(
      this.DOM_NODES.cells,
      this.DOM_NODES.trolley,
      numberOfNeededCells
    );

    this.CELL_POSITITIONS = prepareCellPositions(this.DOM_NODES.cells.length);
  }

  private getSpeedAvg() {
    return (
      this.LAST_KNOWN_SPEEDS.reduce((p, c) => p + c, 0) /
      this.LAST_KNOWN_SPEEDS.length
    );
  }

  private setAnimationDirection(dragSpeed: number) {
    if (dragSpeed < 0) {
      this.OPTIONS.animationSpeed = Math.abs(this.OPTIONS.animationSpeed) * -1;
    } else {
      this.OPTIONS.animationSpeed = Math.abs(this.OPTIONS.animationSpeed);
    }
  }

  private resize() {
    this.CONTAINER_SIZE = getContainerSize(this.DOM_NODES.container);

    //TODO: Real resizing
  }

  private resetDrag() {
    this.CURRENT_DRAG_START_X = undefined;
    this.CURRENT_DRAG_OFFSET = undefined;
    this.LAST_KNOWN_SPEEDS = [];
  }

  get offset() {
    return this.ABSOLUTE_DRAG_OFFSET + (this.CURRENT_DRAG_OFFSET ?? 0);
  }
}
