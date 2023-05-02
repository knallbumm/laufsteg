import type { LaufstegOptions } from '../../types';
import type { InternalLaufsteg } from '../../types/InternalLaufsteg';
import { initInternal } from './initInternal';
import { initPublicOptions } from './initPublicOptions';

type OptionalOptions = Omit<InternalLaufsteg, 'options'> & {
  options?: InternalLaufsteg['options'];
};

export function initLaufsteg(
  options: LaufstegOptions,
  container: HTMLDivElement
): InternalLaufsteg {
  const laufsteg: OptionalOptions = {
    callbacks: {},
    _internal: initInternal(container, options),
  };

  laufsteg.options = initPublicOptions(laufsteg as InternalLaufsteg)(options);

  return laufsteg as InternalLaufsteg;
}
