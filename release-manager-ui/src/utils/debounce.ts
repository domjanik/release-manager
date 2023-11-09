import { useState } from "react";

export function useDebounce<T>(debouncedMethod: Function) {
  const DEFAULT_DEBOUNCE = 500;

  const [timer, setTimer] = useState<number | undefined>();
  const callDebouncedMethod = (value: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    return setTimer(
      window.setTimeout(() => debouncedMethod(value), DEFAULT_DEBOUNCE)
    );
  };

  return callDebouncedMethod;
}
