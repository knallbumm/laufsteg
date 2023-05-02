import type { LaufstegOptions } from '../../types';
import type { InternalLaufsteg } from '../../types/InternalLaufsteg';
import { animationSpeed } from '../updates/animationSpeed';

export const initPublicOptions =
  (laufsteg: InternalLaufsteg) =>
  (options: LaufstegOptions): LaufstegOptions => {
    return new Proxy<LaufstegOptions>(options, {
      set: (target, property, value) => {
        if (property === 'animationSpeed') {
          animationSpeed(laufsteg)(value);
        }

        //@ts-expect-error Weird proxies
        target[property] = value;
        return true;
      },
    });
  };
