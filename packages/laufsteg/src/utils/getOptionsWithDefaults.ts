import type { LaufstegOptions } from '../types';

export function getOptionsWithDefaults(
  options: Partial<LaufstegOptions>
): LaufstegOptions {
  return {
    offset: options.offset ?? 0,
    draggable: options.draggable ?? true,
    animationSpeed: options.animationSpeed ?? 100,
    friction: options.friction ?? 8,
    overflowItems: options.overflowItems ?? 1,
    gap: options.gap ?? 0,
    cursor: options.cursor ?? {
      hover: 'grab',
      dragging: 'grabbing',
    },
  };
}
