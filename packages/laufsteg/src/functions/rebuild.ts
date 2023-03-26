import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { extractCells } from '../utils/extractCells';
import { getCellPixelSize } from '../utils/getCellPixelSize';
import { removeAllClones } from '../utils/removeAllClones';
import { setPositionsToCells } from '../utils/setPositionsToCells';
import { applyItemSize } from './applyItemSize';
import { startCSSAnimation } from './startCSSAnimation';
import { stopCSSAnimation } from './stopCSSAnimation';

export const rebuild = (wrapper: LaufstegWrapper) => () => {
  stopCSSAnimation(wrapper)(0);
  removeAllClones(
    wrapper.internal.domNodes.cells,
    wrapper.internal.domNodes.trolley
  );
  wrapper.internal.domNodes.cells = extractCells(
    wrapper.internal.domNodes.trolley
  );

  const firstCell = wrapper.internal.domNodes.cells[0];
  wrapper.internal.cellSize = getCellPixelSize(firstCell);
  if (wrapper.internal.cellSize.width === 0) {
    return;
  }
  applyItemSize(wrapper)();

  setPositionsToCells(
    wrapper.internal.domNodes.cells,
    wrapper.internal.cellPositions
  );

  startCSSAnimation(wrapper)();
};
