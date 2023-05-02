import { addEventListeners } from '../functions/addEventListeners';
import { addVisibilityCheck } from '../functions/addVisibilityCheck';
import { initLaufsteg } from '../functions/init/initLaufsteg';
import { rebuild } from '../functions/rebuild';
import { start } from '../functions/start';
import { startSwitchInterval } from '../functions/startSwitchInterval';
import { stop } from '../functions/stop';
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

export function createLaufsteg(
  container: HTMLDivElement,
  options: Partial<LaufstegOptions>
): LaufstegWithFunctions {
  const parsedOptions = getOptionsWithDefaults(options);

  const laufsteg = initLaufsteg(parsedOptions, container);

  applyGap(container, parsedOptions.gap);

  laufsteg._internal.containerSize = getContainerSize(container);

  const firstCell = laufsteg._internal.domNodes.cells[0];
  laufsteg._internal.cellSize = getCellPixelSize(firstCell);

  applyItemSize(laufsteg)();

  setPositionsToCells(
    laufsteg._internal.domNodes.cells,
    laufsteg._internal.cellPositions
  );

  addEventListeners(laufsteg);

  applyCursors(container, parsedOptions.cursor, isDragging(laufsteg));

  start(laufsteg)();

  startSwitchInterval(laufsteg)();

  addResizeObserver(firstCell, () => {
    laufsteg._internal.cellSize = getCellPixelSize(firstCell);
    applyItemSize(laufsteg)();
  });

  const startFn = start(laufsteg);
  const stopFn = stop(laufsteg);

  addVisibilityCheck({
    onVisible: startFn,
    onHidden: stopFn,
  });

  (laufsteg as Laufsteg as LaufstegWithFunctions).rebuild = rebuild(laufsteg);
  (laufsteg as Laufsteg as LaufstegWithFunctions).start = startFn;
  (laufsteg as Laufsteg as LaufstegWithFunctions).stop = stopFn;

  return laufsteg as Laufsteg as LaufstegWithFunctions;
}
