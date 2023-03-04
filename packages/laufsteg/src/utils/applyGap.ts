import type { Gap } from '../types/Gap';

export function applyGap(container: HTMLDivElement, gap: Gap) {
  let gapString: string;

  if (typeof gap == 'string') {
    gapString = gap;
  } else {
    gapString = `${gap}px`;
  }

  container.style.setProperty('--laufsteg-cell-gap', gapString);
}
