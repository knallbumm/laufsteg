export function getEventXPosition(event: MouseEvent | TouchEvent): number {
  if (event instanceof MouseEvent) {
    return event.pageX;
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    return event.touches[0].pageX;
  } else {
    throw new Error('There is something wrong with the event');
  }
}
