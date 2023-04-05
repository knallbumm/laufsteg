import type { Laufsteg } from './Laufsteg';

export interface LaufstegWithFunctions extends Laufsteg {
  rebuild: () => void;
  start: () => void;
  stop: () => void;
}
