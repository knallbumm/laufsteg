import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { calculateOverdoses } from '../utils/calculateOverdoses';
import { findMaxPositions } from '../utils/findMaxPositons';
import { getOffset } from '../utils/getOffset';
import { setPositionsToCells } from '../utils/setPositionsToCells';

export const rearrangeCellsIfNeeded = (wrapper: LaufstegWrapper) => () => {
  const { min, max, indexOfMin, indexOfMax } = findMaxPositions(
    wrapper.internal.cellPositions
  );

  const { leftOverdose, rightOverdose } = calculateOverdoses({
    offset: getOffset(wrapper),
    min,
    cellSize: wrapper.internal.cellSize,
    containerSize: wrapper.internal.containerSize,
    numberOfCells: wrapper.internal.cellPositions.length,
  });

  console.log(leftOverdose, rightOverdose, 'OVERDOSE');

  if (rightOverdose > leftOverdose) {
    const difference = rightOverdose - leftOverdose;
    const correctedDifference = Math.abs(
      rightOverdose -
        wrapper.internal.cellSize.width -
        (leftOverdose + wrapper.internal.cellSize.width)
    );

    if (correctedDifference < difference) {
      wrapper.internal.cellPositions[indexOfMax] = min - 100;
      setPositionsToCells(
        wrapper.internal.domNodes.cells,
        wrapper.internal.cellPositions
      );
    }
    console.log(correctedDifference, difference, 1);
  } else if (leftOverdose > rightOverdose) {
    const difference = leftOverdose - rightOverdose;
    const correctedDifference = Math.abs(
      leftOverdose -
        wrapper.internal.cellSize.width -
        (rightOverdose + wrapper.internal.cellSize.width)
    );

    if (correctedDifference < difference) {
      wrapper.internal.cellPositions[indexOfMin] = max + 100;
      setPositionsToCells(
        wrapper.internal.domNodes.cells,
        wrapper.internal.cellPositions
      );
      wrapper.internal.domNodes.cells, wrapper.internal.cellPositions;
    }
    // console.log(correctedDifference, difference, 2);
  }
};
