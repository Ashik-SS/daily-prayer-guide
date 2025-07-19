import { useState, useEffect } from 'react';

export interface PrayerTime {
  name: string;
  time: string;
  date: Date;
}

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);

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