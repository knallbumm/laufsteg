import { useEffect, useRef } from 'react';

export const useOnlyUpdateEffect = (fn: () => void, deps: unknown[]) => {
  const alreadyRun = useRef(false);
  useEffect(() => {
    if (alreadyRun.current) {
      fn();
    } else {
      alreadyRun.current = true;
    }
  }, deps);
};
