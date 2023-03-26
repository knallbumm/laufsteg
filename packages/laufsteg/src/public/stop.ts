import { stopCSSAnimation } from '../functions/stopCSSAnimation';
import { wrapper } from './createLaufsteg';

export function stop() {
  stopCSSAnimation(wrapper)();
}
