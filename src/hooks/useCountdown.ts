import { useEffect, useState } from "react";

export function useCountdown(targetTimestamp: number) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getRemainingTime(targetTimestamp),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return timeLeft;
}

function getRemainingTime(target: number) {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { minutes: 0, seconds: 0, expired: true };
  }

  return {
    minutes: Math.floor(diff / 1000 / 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}
