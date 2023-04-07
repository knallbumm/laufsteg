import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { applyItemSize } from '../utils/applyItemSize';
import { extractCells } from '../utils/extractCells';
import { getCellPixelSize } from '../utils/getCellPixelSize';
import { removeAllClones } from '../utils/removeAllClones';
import { setPositionsToCells } from '../utils/setPositionsToCells';
import { startCSSAnimation } from './startCSSAnimation';
import { stopCSSAnimation } from './stopCSSAnimation';

export const rebuild = (laufsteg: InternalLaufsteg) => () => {
  stopCSSAnimation(laufsteg)(0);
  removeAllClones(
    laufsteg._internal.domNodes.cells,
    laufsteg._internal.domNodes.trolley
  );
  laufsteg._internal.domNodes.cells = extractCells(
    laufsteg._internal.domNodes.trolley
  );

  const firstCell = laufsteg._internal.domNodes.cells[0];
  laufsteg._internal.cellSize = getCellPixelSize(firstCell);
  if (laufsteg._internal.cellSize.width === 0) {
    return;
  }
  applyItemSize(laufsteg)();

  setPositionsToCells(
    laufsteg._internal.domNodes.cells,
    laufsteg._internal.cellPositions
  );

  startCSSAnimation(laufsteg)();
};
