export function setPositionsToCells(
  cells: HTMLDivElement[],
  positions: number[]
): void {
  for (const [index, cell] of cells.entries()) {
    const position = positions?.[index];
    if (position == undefined) {
      throw new Error('No cell position known for this cell');
    }
    cell.style.transform = `translateX(${position}%)`;
  }
}
