import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

export function NextPrayerCountdown({ nextPrayerName, nextPrayerTime }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = nextPrayerTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextPrayerTime]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <Card className="p-6 bg-prayer-card-gradient border-border/50 shadow-prayer-card">
      <div className="text-center space-y-4">
        <div>
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Next Prayer</h3>
          <h2 className="text-2xl font-bold text-primary">{nextPrayerName}</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground font-mono">
              {formatTime(timeLeft.hours)}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Hours</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground font-mono">
              {formatTime(timeLeft.minutes)}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Minutes</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground font-mono">
              {formatTime(timeLeft.seconds)}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Seconds</div>
          </div>
        </div>
      </div>
    </Card>
  );
}