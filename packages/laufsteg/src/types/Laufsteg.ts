import type { Callbacks, LaufstegOptions } from '../../types';

export interface Laufsteg {
  options: LaufstegOptions;
  callbacks: Partial<Callbacks>;
}
