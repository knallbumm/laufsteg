import { addEventListeners } from '../functions/addEventListeners';
import { initLaufsteg } from '../functions/init/initLaufsteg';
import { rebuild } from '../functions/rebuild';
import { startSwitchInterval } from '../functions/startSwitchInterval';
import type { LaufstegOptions } from '../types';
import type { Laufsteg } from '../types/Laufsteg';
import type { LaufstegWithFunctions } from '../types/LaufstegWithFunctions';
import { addResizeObserver } from '../utils/addResizeObserver';
import { applyCursors } from '../utils/applyCursors';
import { applyGap } from '../utils/applyGap';
import { applyItemSize } from '../utils/applyItemSize';
import { getCellPixelSize } from '../utils/getCellPixelSize';
import { getContainerSize } from '../utils/getContainerSize';
import { getOptionsWithDefaults } from '../utils/getOptionsWithDefaults';
import { isDragging } from '../utils/isDragging';
import { setPositionsToCells } from '../utils/setPositionsToCells';
import { start } from './start';

export function createLaufsteg(
  container: HTMLDivElement,
  options: Partial<LaufstegOptions>
): LaufstegWithFunctions {
  const parsedOptions = getOptionsWithDefaults(options);

  const laufsteg = initLaufsteg(parsedOptions, container);

  applyGap(container, parsedOptions.gap);

  laufsteg._internal.containerSize = getContainerSize(container);

  // Sizes the trolley based on the first cell
  const firstCell = laufsteg._internal.domNodes.cells[0];
  laufsteg._internal.cellSize = getCellPixelSize(firstCell);

  applyItemSize(laufsteg)();

  setPositionsToCells(
    laufsteg._internal.domNodes.cells,
    laufsteg._internal.cellPositions
  );

  addEventListeners(laufsteg);

  applyCursors(container, parsedOptions.cursor, isDragging(laufsteg));

  start(laufsteg);

  startSwitchInterval(laufsteg)();

  addResizeObserver(firstCell, () => {
    laufsteg._internal.cellSize = getCellPixelSize(firstCell);
    applyItemSize(laufsteg)();
  });

  (laufsteg as Laufsteg as LaufstegWithFunctions).rebuild = rebuild(laufsteg);

  return laufsteg as Laufsteg as LaufstegWithFunctions;
}
