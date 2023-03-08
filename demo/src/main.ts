import './style.css';

import { createLaufsteg } from 'laufsteg';

const container = document.getElementById(
  'laufsteg-sample-1'
) as HTMLDivElement;

if (container) {
  const laufsteg = createLaufsteg(container, { gap: '3rem' });
}
