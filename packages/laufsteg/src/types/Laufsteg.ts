import type { Callbacks } from './callbacks';
import type { LaufstegOptions } from './LaufstegOptions';

export interface Laufsteg {
  options: LaufstegOptions;
  callbacks: Partial<Callbacks>;
}
