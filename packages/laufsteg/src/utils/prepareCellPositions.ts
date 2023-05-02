export function prepareCellPositions(
  numberOfCells: number,
  offset: number
): number[] {
  return Array.from({ length: numberOfCells }, (_, k) => {
    return (k - offset) * 100;
  });
}
