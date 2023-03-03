import type { LaufstegOptions } from './types';
import type { Cells } from './types/Cells';
import type { Size } from './types/Size';
import { calculateNeededElements } from './utils/calculateNeededElements';
import { copyCellsIntoTrolley } from './utils/copyCellsIntoTrolley';
import { fillUpCells } from './utils/fillUpCells';
import { getCellPixelSize } from './utils/getCellPixelSize';
import { getContainerSize } from './utils/getContainerSize';
import { prepareCellPositions } from './utils/prepareCellPositions';
import { setPositionsToCells } from './utils/setPositionsToCells';

const CELL_OVERFLOW_COUNT = 2;

export class Laufsteg {
  private DOM_NODES: {
    container?: HTMLDivElement;
    trolley?: HTMLDivElement;
    cells: Cells;
  } = { cells: [] };

  private state: 'CSS_ANIMATING' | 'DECLERATING' | 'DRAGGING' = 'CSS_ANIMATING';

  private containerSize: Size;
  private cellSize: Size;

  private numberOfNeededCells: number;

  private cellPositions: number[] = [];

  private RUNNING = false;

  private ABSOLUTE_DRAG_OFFSET = 0;

  private CURRENT_DRAG_START?: number = undefined;
  private CURRENT_DRAG_OFFSET?: number = undefined;

  private ANIMATING_SPEED = -100;

  private LAST_SPEED = 0;

  private NEXT_ANIMATION_STEP = 0;

  private LAST_KNOWN_SPEEDS: number[] = [];

  FRAME_COUNT = 0;
  PREVIOUSE_TIMESTAMP: number | undefined = undefined;

  constructor(container: HTMLDivElement, options: Partial<LaufstegOptions>) {
    if (!container) {
      throw new Error('No container given!');
    }

    this.DOM_NODES.container = container;
    this.DOM_NODES.trolley = container.getElementsByClassName(
      'laufsteg-trolley'
    )?.[0] as HTMLDivElement;

    if (!this.DOM_NODES.trolley) {
      throw new Error('No trolley found');
    }

    const cells = Array.from(
      this.DOM_NODES.trolley.getElementsByClassName('laufsteg-cell')
    ) as Cells;

    if (cells.length < 1) {
      throw new Error('Not enough cells given');
    }

    this.DOM_NODES.cells = cells;

    this.cellSize = getCellPixelSize(cells[0]);
    this.DOM_NODES.trolley.style.height = `${this.cellSize.height}px`;
    this.DOM_NODES.trolley.style.width = `${this.cellSize.width}px`;

    copyCellsIntoTrolley(container, cells, this.DOM_NODES.trolley);

    this.containerSize = getContainerSize(container);
    this.numberOfNeededCells =
      calculateNeededElements(this.cellSize, this.containerSize) +
      CELL_OVERFLOW_COUNT;

    fillUpCells(cells, this.DOM_NODES.trolley, this.numberOfNeededCells);

    this.cellPositions = prepareCellPositions(cells.length);
    setPositionsToCells(cells, this.cellPositions);

    this.addEventListeners();

    this.animateCSS();
  }

  start() {
    this.RUNNING = true;
  }

  get running() {
    return this.RUNNING;
  }

  private addEventListeners() {
    this.DOM_NODES.container?.addEventListener(
      'mousedown',
      this.draggingStarted
    );
    this.DOM_NODES.container?.addEventListener(
      'touchstart',
      this.draggingStarted
    );

    window.addEventListener('mousemove', this.draggingMoved);
    window.addEventListener('touchmove', this.draggingMoved);

    window.addEventListener('mouseup', this.draggingEnded);
    window.addEventListener('touchend', this.draggingEnded);

    this.DOM_NODES.trolley?.addEventListener('transitionend', () => {
      this.ABSOLUTE_DRAG_OFFSET = this.NEXT_ANIMATION_STEP;
      this.animateCSS();
    });

    // this.DOM_NODES.container?.addEventListener(
    //   'mouseleave',
    //   this.draggingEnded
    // );

    this.DOM_NODES.trolley?.addEventListener('touchcancel', this.draggingEnded);
  }

  private draggingStarted = (event: MouseEvent | TouchEvent) => {
    this.state = 'DRAGGING';
    this.captureCurrentOffset();
    this.setAbsoluteDragOffset(this.ABSOLUTE_DRAG_OFFSET);
    this.removeCSSTransition();

    if (event instanceof MouseEvent) {
      this.CURRENT_DRAG_START = event.pageX;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      //TODO: Check if there is a better way than using the first touch
      this.CURRENT_DRAG_START = event.touches[0].pageX;
    }

    this.LAST_SPEED = 0;
  };

  OLD_TIMESTAMP = 0;

  private draggingMoved = (event: MouseEvent | TouchEvent) => {
    if (this.CURRENT_DRAG_START == undefined) {
      return;
    }

    const timeElapsed = performance.now() - this.OLD_TIMESTAMP;

    const oldCurrentDragOffset = this.CURRENT_DRAG_OFFSET ?? 0;
    if (event instanceof MouseEvent) {
      this.CURRENT_DRAG_OFFSET = event.pageX - this.CURRENT_DRAG_START;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      //TODO: Check if there is a better way than using the first touch

      this.CURRENT_DRAG_OFFSET =
        event.touches[0].pageX - this.CURRENT_DRAG_START;

      //TODO: DONT DO IT HERE
    }
    this.OLD_TIMESTAMP = performance.now();
    if (!this.CURRENT_DRAG_OFFSET) {
      return;
    }

    this.LAST_KNOWN_SPEEDS.push(
      Math.round(
        ((oldCurrentDragOffset - this.CURRENT_DRAG_OFFSET) / timeElapsed) * 1000
      )
    );

    if (this.LAST_KNOWN_SPEEDS.length > 5) {
      this.LAST_KNOWN_SPEEDS.shift();
    }

    const consolidatedOffset =
      this.ABSOLUTE_DRAG_OFFSET + this.CURRENT_DRAG_OFFSET;

    this.setAbsoluteDragOffset(consolidatedOffset);

    this.switchCellPositions();
  };

  private draggingEnded = (event: MouseEvent | TouchEvent) => {
    this.ABSOLUTE_DRAG_OFFSET += this.CURRENT_DRAG_OFFSET ?? 0;

    this.setAbsoluteDragOffset(this.ABSOLUTE_DRAG_OFFSET);

    this.CURRENT_DRAG_START = undefined;
    this.CURRENT_DRAG_OFFSET = undefined;

    const speedAverage =
      this.LAST_KNOWN_SPEEDS.reduce((p, c) => p + c, 0) /
      this.LAST_KNOWN_SPEEDS.length;

    if (speedAverage < 0) {
      this.ANIMATING_SPEED = Math.abs(this.ANIMATING_SPEED) * -1;
    } else {
      this.ANIMATING_SPEED = Math.abs(this.ANIMATING_SPEED);
    }

    this.LAST_SPEED = speedAverage;
    this.LAST_KNOWN_SPEEDS = [];
    this.state = 'DECLERATING';

    this.FRAME_COUNT = 0;
    this.PREVIOUSE_TIMESTAMP = undefined;
    this.beginDeclarating(performance.now());
  };

  private setAbsoluteDragOffset(offset: number) {
    if (this.DOM_NODES.trolley) {
      this.DOM_NODES.trolley.style.transform = `translateX(${offset}px)`;
    }
  }

  private switchCellPositions() {
    const offset = this.ABSOLUTE_DRAG_OFFSET + (this.CURRENT_DRAG_OFFSET ?? 0);
    const mostLeftValue = Math.min(...this.cellPositions);
    const mostRightValue = Math.max(...this.cellPositions);

    const leftOverdose =
      ((mostLeftValue / 100) * this.cellSize.width + offset) * -1;

    const rightOverdose =
      this.cellPositions.length * this.cellSize.width -
      leftOverdose -
      this.containerSize.width;

    if (rightOverdose > leftOverdose) {
      const distance = rightOverdose - leftOverdose;
      const currectedDistance = Math.abs(
        rightOverdose -
          this.cellSize.width -
          (leftOverdose + this.cellSize.width)
      );

      if (currectedDistance < distance) {
        const indexOfHighest = this.cellPositions.indexOf(mostRightValue);
        this.cellPositions[indexOfHighest] = mostLeftValue - 100;
        setPositionsToCells(this.DOM_NODES.cells, this.cellPositions);
        console.info('Moved most right cell to legt');
      }
    } else if (leftOverdose > rightOverdose) {
      const distance = leftOverdose - rightOverdose;
      const currectedDistance = Math.abs(
        leftOverdose -
          this.cellSize.width -
          (rightOverdose + this.cellSize.width)
      );

      if (currectedDistance < distance) {
        const indexOfLowest = this.cellPositions.indexOf(mostLeftValue);
        this.cellPositions[indexOfLowest] = mostRightValue + 100;
        setPositionsToCells(this.DOM_NODES.cells, this.cellPositions);
        console.info('Moved most left cell to right');
      }
    }
  }

  private beginDeclarating(newTime: number) {
    this.FRAME_COUNT += 1;

    let delta = 20;
    if (this.PREVIOUSE_TIMESTAMP) {
      delta = newTime - this.PREVIOUSE_TIMESTAMP;
    }
    this.PREVIOUSE_TIMESTAMP = newTime;

    const demoSpeed =
      this.LAST_SPEED * Math.pow(0.99, this.FRAME_COUNT * 3) +
      (!this.CURRENT_DRAG_OFFSET ? this.ANIMATING_SPEED : 0);
    console.log(demoSpeed);
    // this.LAST_SPEED = this.LAST_SPEED * 0.9 + this.LAST_SPEED * 0.1 * 0.2;

    const pixelMove = demoSpeed / (1000 / delta);

    this.setAbsoluteDragOffset((this.ABSOLUTE_DRAG_OFFSET -= pixelMove));

    this.switchCellPositions();

    if (this.state == 'DECLERATING') {
      if (Math.abs(demoSpeed) > 1 + Math.abs(this.ANIMATING_SPEED)) {
        window.requestAnimationFrame((time) => {
          this.beginDeclarating(time);
        });
      } else {
        this.LAST_SPEED = 0;
        this.FRAME_COUNT = 0;
        this.PREVIOUSE_TIMESTAMP = undefined;
        this.animateCSS();
      }
    }
  }

  private TRANSITIONSTART: number | undefined = undefined;

  private animateCSS() {
    this.TRANSITIONSTART = performance.now();

    this.state = 'CSS_ANIMATING';

    this.NEXT_ANIMATION_STEP = this.ABSOLUTE_DRAG_OFFSET - this.ANIMATING_SPEED;
    this.addCSSTransition();
    this.setAbsoluteDragOffset(this.NEXT_ANIMATION_STEP);

    this.switchCellPositions();

    console.log(this.NEXT_ANIMATION_STEP);
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
}
