import type { Cells } from '../types/Cells';

export function removeAllClones(cells: Cells, trolley: HTMLDivElement) {
  const clonedCells = cells.filter((cell) =>
    cell.classList.contains('laufsteg-cloned')
  );

  for (const cell of clonedCells) {
    trolley.removeChild(cell);
  }
}
