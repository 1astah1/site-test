import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          // Reset to 24 hours when timer reaches 0
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 mb-8">
      <span className="text-2xl md:text-3xl font-extrabold text-accent drop-shadow-lg">Предложение заканчивается через:</span>
      <div className="flex gap-2">
        {[
          { label: 'ЧАС', value: timeLeft.hours },
          { label: 'МИН', value: timeLeft.minutes },
          { label: 'СЕК', value: timeLeft.seconds }
        ].map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            <div className="csgo-card px-4 py-2 min-w-[70px] text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-primary drop-shadow-lg">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-base md:text-lg text-muted-foreground font-bold">{unit.label}</div>
            </div>
            {index < 2 && <span className="text-3xl md:text-5xl font-extrabold text-accent mx-1">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
