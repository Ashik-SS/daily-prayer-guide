import { useState, useEffect, useRef } from 'react';

export interface PrayerTime {
  name: string;
  time: string;
  date: Date;
}

export function usePrayerTimes(onPrayerTime?: (prayerName: string) => void) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const checkedPrayersRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Get today's prayer times (simplified calculation for demo)
    const today = new Date();
    const times = calculatePrayerTimes(today);
    setPrayerTimes(times);

    // Find next prayer
    const now = new Date();
    const next = times.find(prayer => prayer.date > now);
    setNextPrayer(next || times[0]); // If no prayer left today, next is first prayer tomorrow
  }, []);

  useEffect(() => {
    if (!onPrayerTime) return;

    const checkPrayerTimes = () => {
      const now = new Date();
      
      prayerTimes.forEach(prayer => {
        const timeDiff = prayer.date.getTime() - now.getTime();
        const prayerKey = `${prayer.name}-${prayer.date.toDateString()}`;
        
        // Trigger alarm when prayer time is reached (within 1 minute)
        if (timeDiff <= 60000 && timeDiff > 0 && !checkedPrayersRef.current.has(prayerKey)) {
          checkedPrayersRef.current.add(prayerKey);
          onPrayerTime(prayer.name);
        }
      });
    };

    const interval = setInterval(checkPrayerTimes, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [prayerTimes, onPrayerTime]);

  return { prayerTimes, nextPrayer };
}

function calculatePrayerTimes(date: Date): PrayerTime[] {
  // Simplified prayer time calculation for demo purposes
  // In a real app, you'd use a proper prayer time calculation library
  const today = new Date(date);
  
  const times = [
    { name: 'Fajr', hour: 5, minute: 30 },
    { name: 'Dhuhr', hour: 12, minute: 15 },
    { name: 'Asr', hour: 15, minute: 45 },
    { name: 'Maghrib', hour: 18, minute: 20 },
    { name: 'Isha', hour: 19, minute: 50 }
  ];

  return times.map(time => {
    const prayerDate = new Date(today);
    prayerDate.setHours(time.hour, time.minute, 0, 0);
    
    return {
      name: time.name,
      time: prayerDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      date: prayerDate
    };
  });
}