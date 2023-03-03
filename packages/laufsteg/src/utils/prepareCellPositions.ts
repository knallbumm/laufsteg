export function prepareCellPositions(numberOfCells: number): number[] {
  return Array.from({ length: numberOfCells }, (_, k) => {
    return k * 100;
  });
}
