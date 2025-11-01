import { useCallback, useEffect, useRef, DependencyList } from "react";

function useDebouncing<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
  deps: DependencyList = []
): (...args: T) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, callback, ...deps]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}

export { useDebouncing };