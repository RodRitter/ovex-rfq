import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

interface CountdownTimerProps {
  expiresAt: number;
  onExpire?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiresAt,
  onExpire,
}) => {
  const calculateTimeLeft = () => {
    const now = DateTime.now();
    const expiry = DateTime.fromSeconds(expiresAt);
    const diff = expiry.diff(now, ['hours', 'minutes', 'seconds']);
    return diff.toObject();
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      if (DateTime.now().toSeconds() >= expiresAt) {
        clearInterval(timer);
        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const { hours = 0, minutes = 0, seconds = 0 } = timeLeft;

  if (DateTime.now().toSeconds() >= expiresAt) {
    return <span className="text-red-400">Expired</span>;
  }

  return (
    <span>
      {hours > 0 && `${String(Math.floor(hours)).padStart(2, '0')}:`}
      {String(Math.floor(minutes)).padStart(2, '0')}:
      {String(Math.floor(seconds)).padStart(2, '0')}
    </span>
  );
};
