import { useEffect, useRef } from 'react';

interface Options {
  wait?: number;
  initialWait?: number;
  incremental?: boolean;
  incrementalAfter?: number;
}

const defaultOptions: Options = { wait: 2000 };

export function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  options: Options = defaultOptions
) {
  const executionCount = useRef(0);
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    argsRef.current = args;

    if (
      options.incremental &&
      options.incrementalAfter &&
      executionCount.current <= options.incrementalAfter
    ) {
      if (options.initialWait !== undefined) {
        timeout.current = setTimeout(() => {
          if (argsRef.current) {
            callback(...argsRef.current);
          }
          cleanup();
        }, options.initialWait);
      } else {
        callback(...argsRef.current);
      }
      executionCount.current++;
    } else {
      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
        cleanup();
      }, options.wait);
    }
  };
}
