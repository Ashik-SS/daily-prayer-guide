import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface NextPrayerCountdownProps {
  nextPrayerName: string;
  nextPrayerTime: Date;
}

export function NextPrayerCountdown({ nextPrayerName, nextPrayerTime }: NextPrayerCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextPrayerTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayerTime]);

  return (
    <Card className="p-6 bg-prayer-accent-gradient border-primary/20 shadow-prayer-glow text-center">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Next Prayer: {nextPrayerName}
        </h2>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground">{timeLeft.hours.toString().padStart(2, '0')}</p>
            <p className="text-xs text-primary-foreground/80 font-medium">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground">{timeLeft.minutes.toString().padStart(2, '0')}</p>
            <p className="text-xs text-primary-foreground/80 font-medium">Minutes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground">{timeLeft.seconds.toString().padStart(2, '0')}</p>
            <p className="text-xs text-primary-foreground/80 font-medium">Seconds</p>
          </div>
        </div>
      </div>
    </Card>
  );
}