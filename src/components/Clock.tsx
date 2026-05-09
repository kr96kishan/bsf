import { useState, useEffect } from 'react';
import '../styles/Clock.css';

export const Clock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="clock">{time}</div>;
};
