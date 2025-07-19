import { Compass, MapPin } from 'lucide-react';
import { PrayerTimeCard } from '@/components/PrayerTimeCard';
import { CurrentTimeDisplay } from '@/components/CurrentTimeDisplay';
import { NextPrayerCountdown } from '@/components/NextPrayerCountdown';
import { AlarmControls } from '@/components/AlarmControls';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { usePrayerAlarm } from '@/hooks/usePrayerAlarm';

const Index = () => {
  const { playAlarm } = usePrayerAlarm();
  const { prayerTimes, nextPrayer } = usePrayerTimes(playAlarm);

  const getCurrentPrayerStatus = (prayerDate: Date) => {
    const now = new Date();
    return {
      isPassed: prayerDate < now,
      isNext: nextPrayer?.date === prayerDate
    };
  };

  return (
    <div className="min-h-screen bg-prayer-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Prayer Times</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Current Location</span>
          </div>
        </div>

        {/* Current Time */}
        <div className="mb-8">
          <CurrentTimeDisplay />
        </div>

        {/* Next Prayer Countdown */}
        {nextPrayer && (
          <div className="mb-8">
            <NextPrayerCountdown 
              nextPrayerName={nextPrayer.name}
              nextPrayerTime={nextPrayer.date}
            />
          </div>
        )}

        {/* Alarm Controls */}
        <div className="mb-8">
          <AlarmControls />
        </div>

        {/* Prayer Times Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prayerTimes.map((prayer) => {
            const status = getCurrentPrayerStatus(prayer.date);
            return (
              <PrayerTimeCard
                key={prayer.name}
                name={prayer.name}
                time={prayer.time}
                isNext={status.isNext}
                isPassed={status.isPassed}
              />
            );
          })}
        </div>

        {/* Qibla Direction */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground bg-card/30 px-4 py-2 rounded-lg border border-border/30">
            <Compass className="w-4 h-4" />
            <span className="text-sm">Qibla Direction: 57°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
