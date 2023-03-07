import type {
  Callbacks,
  LaufstegOptions,
  OnDecelerationEnd,
  OnDecelerationStart,
  OnDragEnd,
  OnDragStart,
} from './types';
import type { Cells } from './types/Cells';
import type { Size } from './types/Size';
import { addResizeObserver } from './utils/addResizeObserver';
import { applyCursors } from './utils/applyCursors';
import { applyGap } from './utils/applyGap';
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
import { removeAllClones } from './utils/removeAllClones';
import {
  setPositionsToCells as applyCellPositions,
  setPositionsToCells,
} from './utils/setPositionsToCells';
import { setTrolleySize } from './utils/setTrolleySize';

export class Laufsteg implements Partial<Callbacks> {
  private DOM_NODES: {
    container: HTMLDivElement;
    trolley: HTMLDivElement;
    cells: Cells;
  };

  private OPTIONS: LaufstegOptions;

  private STATE?: 'CSS_ANIMATING' | 'DECLERATING' | 'DRAGGING' = undefined;

  private CONTAINER_SIZE: Size;
  private CELL_SIZE: Size;

  private CELL_POSITITIONS: number[] = [];

  private SAVED_DRAG_OFFSET = 0;

  private CURRENT_DRAG_START_X?: number = undefined;
  private CURRENT_DRAG_TRAVEL?: number = undefined;

  private DRAG_RELEASE_SPEED = 0;

  private CSS_ANIMATION_DESTINATION = 0;

  private LAST_SPEEDS: number[] = [];

  private LAST_MOVE_TIMESTAMP = 0;

  private DECELERATION_START: number | undefined = undefined;
  private LAST_DECELERATION_FRAME_TIMESTAMP: number | undefined = undefined;

  public onDragStart?: OnDragStart;
  public onDragEnd?: OnDragEnd;
  public onDecelerationStart?: OnDecelerationStart;
  public onDecelerationEnd?: OnDecelerationEnd;

  constructor(container: HTMLDivElement, options: Partial<LaufstegOptions>) {
    this.OPTIONS = {
      offset: options.offset ?? 0,
      draggable: options.draggable ?? true,
      animationSpeed: options.animationSpeed ?? 100,
      friction: options.friction ?? 8,
      overflowItems: options.overflowItems ?? 1,
      gap: options.gap ?? 0,
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

    applyGap(container, this.OPTIONS.gap);

    this.CONTAINER_SIZE = getContainerSize(container);

    // Sizes the trolley based on the first cell
    const firstCell = this.DOM_NODES.cells[0];
    this.CELL_SIZE = getCellPixelSize(firstCell);
    this.applyItemSize();

    applyCellPositions(this.DOM_NODES.cells, this.CELL_POSITITIONS);

    this.addEventListeners();

    applyCursors(container, this.OPTIONS.cursor, this.isDragging);

    this.start();

    addResizeObserver(firstCell, () => {
      this.CELL_SIZE = getCellPixelSize(firstCell);
      this.applyItemSize();
    });
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
      this.SAVED_DRAG_OFFSET = this.CSS_ANIMATION_DESTINATION;
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
    applyCursors(
      this.DOM_NODES.container,
      this.OPTIONS.cursor,
      this.isDragging
    );
    this.onDragStart?.(this.offset);
  };

  private draggingMoved = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging) {
      return;
    }

    const timeDeltaSinceLastMove = performance.now() - this.LAST_MOVE_TIMESTAMP;

    const lastMoveDragOffset = this.CURRENT_DRAG_TRAVEL ?? 0;
    const dragXPosition = getEventXPosition(event);
    this.CURRENT_DRAG_TRAVEL = dragXPosition - (this.CURRENT_DRAG_START_X ?? 0);

    this.LAST_MOVE_TIMESTAMP = performance.now();

    const travelSinceLastMove = lastMoveDragOffset - this.CURRENT_DRAG_TRAVEL;

    this.logSpeed(timeDeltaSinceLastMove, travelSinceLastMove);

    this.setOffsetToDOM(this.offset);

    this.rearrangeCellsIfNeeded();
  };

  private draggingEnded = () => {
    if (!this.isDragging) {
      return;
    }

    this.SAVED_DRAG_OFFSET += this.CURRENT_DRAG_TRAVEL ?? 0;

    this.setOffsetToDOM(this.SAVED_DRAG_OFFSET);

    const dragReleaseSpeed = this.getSpeedAvg();
    this.setAnimationDirection(dragReleaseSpeed);
    this.DRAG_RELEASE_SPEED = dragReleaseSpeed;

    this.resetDrag();

    this.onDragEnd?.(this.offset);
    this.STATE = 'DECLERATING';

    applyCursors(
      this.DOM_NODES.container,
      this.OPTIONS.cursor,
      this.isDragging
    );
    this.onDecelerationStart?.(this.offset, dragReleaseSpeed);
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

  private beginDeceleration(frameTimestamp: number) {
    let delta = 20; // TODO: Find better implementation for this random value
    if (this.LAST_DECELERATION_FRAME_TIMESTAMP) {
      delta = frameTimestamp - this.LAST_DECELERATION_FRAME_TIMESTAMP;
    } else {
      this.DECELERATION_START = performance.now();
    }
    this.LAST_DECELERATION_FRAME_TIMESTAMP = frameTimestamp;

    const finalSpeed = !this.CURRENT_DRAG_TRAVEL
      ? this.OPTIONS.animationSpeed
      : 0;

    const progress =
      (frameTimestamp - (this.DECELERATION_START ?? frameTimestamp)) * 0.05;

    const currentSpeed =
      this.DRAG_RELEASE_SPEED *
        Math.pow(0.99, progress * this.OPTIONS.friction) +
      finalSpeed;

    const pixelTravel = currentSpeed / (1000 / delta);

    this.setOffsetToDOM((this.SAVED_DRAG_OFFSET -= pixelTravel));

    const numberOfItemsToSwitch = Math.ceil(
      Math.abs(pixelTravel) / this.CELL_SIZE.width
    );

    for (let i = 0; i < numberOfItemsToSwitch; i++) {
      this.rearrangeCellsIfNeeded();
    }

    if (this.STATE == 'DECLERATING') {
      if (Math.abs(currentSpeed) > 1 + Math.abs(this.OPTIONS.animationSpeed)) {
        window.requestAnimationFrame((time) => {
          this.beginDeceleration(time);
        });
      } else {
        this.resetDecelerating();
        this.startCSSAnimation();
        this.onDecelerationEnd?.(this.offset);
      }
    } else {
      this.resetDecelerating();
    }
  }

  private startCSSAnimation() {
    // TODO: Handle state when is decelerating
    this.STATE = 'CSS_ANIMATING';

    this.CSS_ANIMATION_DESTINATION =
      this.SAVED_DRAG_OFFSET - this.OPTIONS.animationSpeed;
    this.addCSSTransition();
    this.setOffsetToDOM(this.CSS_ANIMATION_DESTINATION);

    this.rearrangeCellsIfNeeded();
  }

  private stopCSSAnimation(offset?: number) {
    if (this.STATE == 'CSS_ANIMATING') {
      if (offset === undefined) {
        this.captureCurrentOffset();
      } else {
        this.SAVED_DRAG_OFFSET = offset;
      }

      this.setOffsetToDOM(this.SAVED_DRAG_OFFSET);
      this.removeCSSTransition();
      this.CSS_ANIMATION_DESTINATION = 0;
    }
  }

  private addCSSTransition() {
    if (!this.DOM_NODES.trolley) {
      return;
    }
    this.DOM_NODES.trolley.style.transition = `transform 1s linear`;
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

    const containerRect = this.DOM_NODES.container.getBoundingClientRect();
    const clientRect = this.DOM_NODES.trolley.getBoundingClientRect();
    this.SAVED_DRAG_OFFSET = clientRect.x - containerRect.x;
  }

  private logSpeed(
    timeDeltaSinceLastMove: number,
    travelSinceLastMove: number
  ) {
    const speedSinceLastMove = Math.round(
      (travelSinceLastMove / timeDeltaSinceLastMove) * 1000
    );
    this.LAST_SPEEDS.push(speedSinceLastMove);

    if (this.LAST_SPEEDS.length > 5) {
      this.LAST_SPEEDS.shift();
    }
  }

  private resetDecelerating() {
    this.DRAG_RELEASE_SPEED = 0;
    this.DECELERATION_START = undefined;
    this.LAST_DECELERATION_FRAME_TIMESTAMP = undefined;
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
      this.LAST_SPEEDS.reduce((p, c) => p + c, 0) / this.LAST_SPEEDS.length
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
    this.rebuild();
  }

  private resetDrag() {
    this.CURRENT_DRAG_START_X = undefined;
    this.CURRENT_DRAG_TRAVEL = undefined;
    this.LAST_SPEEDS = [];
  }

  get offset() {
    return Math.round(this.SAVED_DRAG_OFFSET + (this.CURRENT_DRAG_TRAVEL ?? 0));
  }

  get isDragging() {
    return this.CURRENT_DRAG_START_X != undefined && this.STATE == 'DRAGGING';
  }

  private applyItemSize() {
    setTrolleySize(this.DOM_NODES.trolley, this.CELL_SIZE);
    this.cloneCellsWhenNeeded();
  }

  public rebuild() {
    this.stopCSSAnimation(0);
    removeAllClones(this.DOM_NODES.cells, this.DOM_NODES.trolley);
    this.DOM_NODES.cells = extractCells(this.DOM_NODES.trolley);

    const firstCell = this.DOM_NODES.cells[0];
    this.CELL_SIZE = getCellPixelSize(firstCell);
    this.applyItemSize();

    setPositionsToCells(this.DOM_NODES.cells, this.CELL_POSITITIONS);

    this.startCSSAnimation();
  }
}
