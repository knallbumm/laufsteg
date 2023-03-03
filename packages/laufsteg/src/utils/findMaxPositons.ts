export function findMaxPositions(cellPositions: number[]) {
  const min = Math.min(...cellPositions);
  const max = Math.max(...cellPositions);

  const indexOfMin = cellPositions.indexOf(min);
  const indexOfMax = cellPositions.indexOf(max);

  return { min, max, indexOfMin, indexOfMax };
}
