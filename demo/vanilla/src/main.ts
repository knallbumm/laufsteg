import './style.css';

import { createLaufsteg } from 'laufsteg';

const container1 = document.getElementById(
  'laufsteg-sample-1'
) as HTMLDivElement;

const container2 = document.getElementById(
  'laufsteg-sample-2'
) as HTMLDivElement;

if (container1) {
  createLaufsteg(container1, { gap: '3rem' });
}

if (container2) {
  createLaufsteg(container2, { gap: '3rem' });
}
