import type { DauerlaufOptions } from 'laufsteg';
import { createDauerlauf } from 'laufsteg';
import type { PropsWithChildren } from 'react';
import React, { Children, useEffect, useRef } from 'react';

export function Dauerlauf({
  children,
  ...props
}: PropsWithChildren<Partial<DauerlaufOptions>>): React.ReactElement {
  const laufsteg = useRef<ReturnType<typeof createDauerlauf> | undefined>();
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && !laufsteg.current) {
      laufsteg.current = createDauerlauf(container.current, props);
    }
  }, [container.current]);

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
