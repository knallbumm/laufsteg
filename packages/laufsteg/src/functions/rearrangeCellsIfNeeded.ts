import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { calculateOverdoses } from '../utils/calculateOverdoses';
import { findMaxPositions } from '../utils/findMaxPositons';
import { getOffset } from '../utils/getOffset';
import { setPositionsToCells } from '../utils/setPositionsToCells';

/**
 * Returns true if cells were switched. False if there was nothing to switch
 * @param laufsteg
 */
export const rearrangeCellsIfNeeded = (laufsteg: InternalLaufsteg) => () => {
  const { min, max, indexOfMin, indexOfMax } = findMaxPositions(
    laufsteg._internal.cellPositions
  );

  const { leftOverdose, rightOverdose } = calculateOverdoses({
    offset: getOffset(laufsteg),
    min,
    cellSize: laufsteg._internal.cellSize,
    containerSize: laufsteg._internal.containerSize,
    numberOfCells: laufsteg._internal.cellPositions.length,
  });

  if (rightOverdose > leftOverdose) {
    const difference = rightOverdose - leftOverdose;
    const correctedDifference = Math.abs(
      rightOverdose -
        laufsteg._internal.cellSize.width -
        (leftOverdose + laufsteg._internal.cellSize.width)
    );

    if (correctedDifference < difference) {
      laufsteg._internal.cellPositions[indexOfMax] = min - 100;
      setPositionsToCells(
        laufsteg._internal.domNodes.cells,
        laufsteg._internal.cellPositions
      );
      return true;
    }
    return false;
  } else if (leftOverdose > rightOverdose) {
    const difference = leftOverdose - rightOverdose;
    const correctedDifference = Math.abs(
      leftOverdose -
        laufsteg._internal.cellSize.width -
        (rightOverdose + laufsteg._internal.cellSize.width)
    );

    if (correctedDifference < difference) {
      laufsteg._internal.cellPositions[indexOfMin] = max + 100;
      setPositionsToCells(
        laufsteg._internal.domNodes.cells,
        laufsteg._internal.cellPositions
      );

      return true;
    }
    return false;
  }
  return false;
};
