import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { calculateNumberOfNeededCells } from '../utils/calculateNumberOfNeededCells';
import { fillUpCells } from '../utils/fillUpCells';
import { prepareCellPositions } from '../utils/prepareCellPositions';

export const cloneCellsWhenNeeded = (wrapper: LaufstegWrapper) => () => {
  const numberOfNeededCells =
    calculateNumberOfNeededCells(
      wrapper.internal.cellSize,
      wrapper.internal.containerSize
    ) +
    wrapper.laufsteg.options.overflowItems * 2;

  fillUpCells(
    wrapper.internal.domNodes.cells,
    wrapper.internal.domNodes.trolley,
    numberOfNeededCells
  );

  wrapper.internal.cellPositions = prepareCellPositions(
    wrapper.internal.domNodes.cells.length
  );
};
