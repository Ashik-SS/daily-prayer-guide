import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

export function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 bg-prayer-card-gradient border-border/50 shadow-prayer-card text-center">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          {formatDate(currentTime)}
        </p>
        <p className="text-4xl font-bold text-primary">
          {formatTime(currentTime)}
        </p>
      </div>
    </Card>
  );
}