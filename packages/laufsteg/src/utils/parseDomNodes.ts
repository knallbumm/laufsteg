import type { DomNodes } from '../types/DomNodes';
import { extractCells } from './extractCells';
import { extractContainer } from './extractContainer';
import { extractTrolley } from './extractTrolley';

export function parseDomNodes(container: HTMLDivElement): DomNodes {
  const trolley = extractTrolley(container);
  return {
    container: extractContainer(container),
    trolley,
    cells: extractCells(trolley),
  };
}
