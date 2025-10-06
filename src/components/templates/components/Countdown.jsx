import React, { useEffect, useState } from 'react';

// Componentes auxiliares
const TimeCell = ({ value, label, color = "#fff" }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color }}>
        {label}
      </div>
    </div>
  );
};

const SeparatorDot = ({ color = "#fff" }) => {
  return (
    <div className="self-center font-light" style={{ color, fontSize: "clamp(2rem, 7vw, 4rem)" }}>
      :
    </div>
  );
};

// Función para construir fecha objetivo
function buildTargetDate(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  
  try {
    let day, month, year;
    
    // Formato DD/MM/YYYY o DD-MM-YYYY
    if (dateStr.includes('/') || dateStr.includes('-')) {
      const separator = dateStr.includes('/') ? '/' : '-';
      const parts = dateStr.split(separator);
      if (parts.length === 3) {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    }
    // Formato "DD de Mes, YYYY"
    else if (dateStr.includes(' de ')) {
      const monthNames = {
        'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
        'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
      };
      
      const parts = dateStr.toLowerCase().split(' ');
      if (parts.length >= 4) {
        day = parseInt(parts[0], 10);
        month = monthNames[parts[2]] || 1;
        year = parseInt(parts[3].replace(',', ''), 10);
      }
    }
    
    if (!day || !month || !year) return null;
    
    // Parsear hora
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    
    return new Date(year, month - 1, day, hours, minutes, 0);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

const Countdown = ({ event, colors, fontPrimary, isQuinceanera, styles = {} }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = buildTargetDate(event.date, event.time);
      if (!targetDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date, event.time]);

  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-4xl mx-auto px-4 text-center" dir="ltr">
        <h2
          className="font-light mb-6 sm:mb-8 tracking-wide"
          style={{ 
            color: colors.primaryText, 
            fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)", 
            fontFamily: fontPrimary 
          }}
        >
          {isQuinceanera ? "Bienvenidos a mis 15 años" : "Bienvenidos a nuestra boda"}
        </h2>

        <div className="flex items-stretch justify-center gap-5 sm:gap-8 select-none">
          <TimeCell value={timeLeft.days} label="días" color={colors.primaryText} />
          <SeparatorDot color={colors.primaryText} />
          <TimeCell value={timeLeft.hours} label="hs" color={colors.primaryText} />
          <SeparatorDot color={colors.primaryText} />
          <TimeCell value={timeLeft.minutes} label="min" color={colors.primaryText} />
          <SeparatorDot color={colors.primaryText} />
          <TimeCell value={timeLeft.seconds} label="seg" color={colors.primaryText} />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
