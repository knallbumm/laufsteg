export function copyCellsIntoTrolley(
  container: HTMLDivElement,
  cells: HTMLDivElement[],
  trolley: HTMLDivElement
) {
  cells.forEach((cell) => {
    trolley.appendChild(cell);
  });

  container.replaceChildren(trolley);
}
