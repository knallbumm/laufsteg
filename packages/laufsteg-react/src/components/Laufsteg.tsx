import { createLaufsteg } from 'laufsteg';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef } from 'react';

export interface LaufstegProps {
  autoscroll?: boolean;
}

export function Laufsteg({
  autoscroll,
  children,
}: PropsWithChildren<LaufstegProps>): React.ReactElement {
  const laufsteg = useRef<ReturnType<typeof createLaufsteg> | undefined>();
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => () => {
      if (container.current && !laufsteg.current) {
        laufsteg.current = createLaufsteg(container.current, {});
      }
    },
    [container.current]
  );

  return (
    <div ref={container} className="laufsteg-container">
      <div className="laufsteg-trolley">
        <div className="laufsteg-cell">
          <strong className="demo-text-large">WOOOOOOOW</strong>
        </div>
        <div className="laufsteg-cell">
          <strong className="demo-text-large">WOOOOOOOW</strong>
        </div>
        <div className="laufsteg-cell">
          <strong className="demo-text-large">WOOOOOOOW</strong>
        </div>
      </div>
    </div>
  );
}
