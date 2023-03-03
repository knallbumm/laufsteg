export function extractTrolley(container: HTMLDivElement): HTMLDivElement {
  const trolley = container.getElementsByClassName(
    'laufsteg-trolley'
  )?.[0] as HTMLDivElement;

  if (!trolley) {
    throw new Error('No trolley found');
  }
  return trolley;
}
