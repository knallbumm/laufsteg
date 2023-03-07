import type { Cells } from '../types/Cells';

export function fillUpCells(
  cells: Cells,
  trolley: HTMLDivElement,
  numberOfNeededCells: number
) {
  const filledCells = cells;

  const numberOfCellsToClone = numberOfNeededCells - filledCells.length;

  if (numberOfCellsToClone <= 0) {
    return;
  }

  for (let i = 0; i < numberOfCellsToClone; i++) {
    const clonedCell = cells[i % cells.length].cloneNode(
      true
    ) as HTMLDivElement;
    clonedCell.classList.add('laufsteg-cloned');
    trolley.appendChild(clonedCell);

    filledCells.push(clonedCell);
  }
}
