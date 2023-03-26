import type { Laufsteg } from './Laufsteg';
import type { LaufstegInternal } from './LaufstegInternal';

export interface InternalLaufsteg extends Laufsteg {
  _internal: LaufstegInternal;
}
