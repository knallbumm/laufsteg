import type {
  Callbacks,
  DauerlaufOptions,
  OnDecelerationEnd,
  OnDecelerationStart,
  OnDragEnd,
  OnDragStart,
} from 'laufsteg';
import { createDauerlauf } from 'laufsteg';
import type { PropsWithChildren } from 'react';
import React, { Children, useCallback, useEffect, useRef } from 'react';

export function Dauerlauf({
  children,
  onDragStart,
  onDragEnd,
  onDecelerationStart,
  onDecelerationEnd,
  ...props
}: PropsWithChildren<
  Partial<DauerlaufOptions> & Partial<Callbacks>
>): React.ReactElement {
  const laufsteg = useRef<ReturnType<typeof createDauerlauf> | undefined>();
  const container = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (container.current && !laufsteg.current) {
      laufsteg.current = createDauerlauf(container.current, props);
      laufsteg.current.onDragStart = onDragStart && handleDragStart;
      laufsteg.current.onDragEnd = onDragEnd && handleDragEnd;
      laufsteg.current.onDecelerationStart =
        onDecelerationStart && handleDecelerationStart;
      laufsteg.current.onDecelerationEnd && handleDecelerationEnd;
    }
  }, [
    container.current,
    handleDragStart,
    handleDragEnd,
    handleDecelerationStart,
    handleDecelerationEnd,
  ]);

  return (
    <div ref={container} className="laufsteg-container">
      <div className="laufsteg-trolley">
        {Children.map(children, (child) => (
          <div className="laufsteg-cell">{child}</div>
        ))}
      </div>
    </div>
  );
}
