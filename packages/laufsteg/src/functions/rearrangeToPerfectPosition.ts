import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';

export const rearrangeToPerfectPosition =
  (laufsteg: InternalLaufsteg) => () => {
    const fn = rearrangeCellsIfNeeded(laufsteg);
    while (fn());
  };
