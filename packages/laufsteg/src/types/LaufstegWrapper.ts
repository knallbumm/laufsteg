import type { Laufsteg } from './Laufsteg';
import type { LaufstegInternal } from './LaufstegInternal';

export interface LaufstegWrapper {
  laufsteg: Laufsteg;
  internal: LaufstegInternal;
}
