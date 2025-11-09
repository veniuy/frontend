import React, { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export const CountdownTimer = ({ targetDate, color = '#000000' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return null;
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  if (!timeLeft) {
    return <div style={{ color }}>¡El evento ha comenzado!</div>;
  }
  
  return (
    <div className="flex gap-4 items-center justify-center" style={{ color }}>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-sm">Días</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm">Horas</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm">Min</div>
      </div>
    </div>
  );
};

