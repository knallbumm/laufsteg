import { startCSSAnimation } from '../functions/startCSSAnimation';
import { wrapper } from './createLaufsteg';

export function start() {
  startCSSAnimation(wrapper)();
}
