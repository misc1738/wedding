import { useEffect, useState } from 'react';

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function compute(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - Date.now());
  const total = Math.floor(diff / 1000);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff <= 0,
  };
}

/** Ticks once a second until the target moment, then stops. */
export function useCountdown(targetIso: string): Countdown {
  const [state, setState] = useState<Countdown>(() => compute(targetIso));

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = compute(targetIso);
      setState(next);
      if (next.done) window.clearInterval(id);
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetIso]);

  return state;
}
