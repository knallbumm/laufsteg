import type {
  Callbacks,
  LaufstegOptions,
  OnDecelerationEnd,
  OnDecelerationStart,
  OnDragEnd,
  OnDragStart,
} from 'laufsteg';
import { createLaufsteg } from 'laufsteg';
import type { PropsWithChildren } from 'react';
import React, { Children, useCallback, useRef } from 'react';

export function Laufsteg({
  children,
  onDragStart,
  onDragEnd,
  onDecelerationStart,
  onDecelerationEnd,
  ...props
}: PropsWithChildren<
  Partial<LaufstegOptions> & Partial<Callbacks>
>): React.ReactElement {
  const laufsteg = useRef<ReturnType<typeof createLaufsteg> | undefined>();

  const handleDragStart = useCallback(
    (...args: Parameters<OnDragStart>) => {
      onDragStart?.(...args);
    },
    [onDragStart]
  );

  const handleDragEnd = useCallback(
    (...args: Parameters<OnDragEnd>) => {
      onDragEnd?.(...args);
    },
    [onDragEnd]
  );

  const handleDecelerationStart = useCallback(
    (...args: Parameters<OnDecelerationStart>) => {
      onDecelerationStart?.(...args);
    },
    [onDecelerationStart]
  );

  const handleDecelerationEnd = useCallback(
    (...args: Parameters<OnDecelerationEnd>) => {
      onDecelerationEnd?.(...args);
    },
    [onDecelerationEnd]
  );

  const initiateLaufsteg = useCallback((elm: HTMLDivElement) => {
    if (elm && !laufsteg.current) {
      laufsteg.current = createLaufsteg(elm, props);
      laufsteg.current.callbacks.onDragStart = onDragStart && handleDragStart;
      laufsteg.current.callbacks.onDragEnd = onDragEnd && handleDragEnd;
      laufsteg.current.callbacks.onDecelerationStart =
        onDecelerationStart && handleDecelerationStart;
      laufsteg.current.callbacks.onDecelerationEnd && handleDecelerationEnd;
    }
  }, []);

  return (
    <div ref={initiateLaufsteg} className="laufsteg-container">
      <div className="laufsteg-trolley">
        {Children.map(children, (child) => (
          <div className="laufsteg-cell">{child}</div>
        ))}
      </div>
    </div>
  );
}
