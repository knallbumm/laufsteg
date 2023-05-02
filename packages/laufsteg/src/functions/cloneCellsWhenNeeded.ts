import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { calculateNumberOfNeededCells } from '../utils/calculateNumberOfNeededCells';
import { fillUpCells } from '../utils/fillUpCells';
import { prepareCellPositions } from '../utils/prepareCellPositions';

export const cloneCellsWhenNeeded = (laufsteg: InternalLaufsteg) => () => {
  const numberOfNeededCells =
    calculateNumberOfNeededCells(
      laufsteg._internal.cellSize,
      laufsteg._internal.containerSize
    ) +
    laufsteg.options.overflowItems * 2;

  fillUpCells(
    laufsteg._internal.domNodes.cells,
    laufsteg._internal.domNodes.trolley,
    numberOfNeededCells
  );

  laufsteg._internal.cellPositions = prepareCellPositions(
    laufsteg._internal.domNodes.cells.length,
    laufsteg._internal.options.overflowItems
  );
};
