import { useEffect, useState } from "react";

const MIN_LOADING_TIME = 2000;

export function useMinimumLoadingTime(duration = MIN_LOADING_TIME) {
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isMinTimePassed;
}
