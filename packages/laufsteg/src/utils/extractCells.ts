import type { Cells } from '../types/Cells';

export function extractCells(trolley: HTMLDivElement): Cells {
  const cells = Array.from(
    trolley.getElementsByClassName('laufsteg-cell')
  ) as Cells;

  if (cells.length < 1) {
    throw new Error('Not enough cells given');
  }
  return cells;
}
