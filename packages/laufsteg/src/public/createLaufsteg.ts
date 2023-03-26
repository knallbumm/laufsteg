import { addEventListeners } from '../functions/addEventListeners';
import { initInternal } from '../functions/init/initInternal';
import { initLaufsteg } from '../functions/init/initLaufsteg';
import type { LaufstegOptions } from '../types';
import type { Laufsteg } from '../types/Laufsteg';
import type { LaufstegWrapper } from '../types/LaufstegWrapper';
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

export let wrapper: LaufstegWrapper;
export function createLaufsteg(
  container: HTMLDivElement,
  options: Partial<LaufstegOptions>
): Laufsteg {
  const parsedOptions = getOptionsWithDefaults(options);

  wrapper = {
    laufsteg: initLaufsteg(parsedOptions),
    internal: initInternal(container),
  };

  applyGap(container, parsedOptions.gap);

  wrapper.internal.containerSize = getContainerSize(container);

  // Sizes the trolley based on the first cell
  const firstCell = wrapper.internal.domNodes.cells[0];
  wrapper.internal.cellSize = getCellPixelSize(firstCell);

  applyItemSize(wrapper)();

  setPositionsToCells(
    wrapper.internal.domNodes.cells,
    wrapper.internal.cellPositions
  );

  addEventListeners(wrapper);

  applyCursors(container, parsedOptions.cursor, isDragging(wrapper));

  start();

  addResizeObserver(firstCell, () => {
    wrapper.internal.cellSize = getCellPixelSize(firstCell);
    applyItemSize(wrapper)();
  });

  if (!wrapper?.laufsteg) {
    throw new Error('Laufsteg could not be created');
  }

  return wrapper?.laufsteg;
}
