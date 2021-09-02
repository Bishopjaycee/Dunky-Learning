import { useState } from "react";

type UserTimerProp = { stopTimer: boolean; duration: number };
type TimeObject = { timer: number };

export default function useTimer({
  stopTimer,
  duration,
}: UserTimerProp): TimeObject {
  const [timer, setTimer] = useState(duration);

  const timeObj = { timer: 0 };

  const timerSubscription = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  if (stopTimer) {
    clearInterval(timerSubscription);
  }

  if (timer <= -1 && !stopTimer) {
    setTimer(duration);
  } else if (timer <= -1 && stopTimer) {
    clearInterval(timerSubscription);
  }
  timeObj.timer = timer;

  return timeObj;
}
