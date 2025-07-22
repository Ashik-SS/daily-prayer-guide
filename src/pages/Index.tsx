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
    <div className="min-h-screen bg-prayer-hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-prayer-accent-gradient bg-clip-text text-transparent animate-glow">
              Prayer Times
            </h1>
            <div className="absolute -inset-4 bg-prayer-glow rounded-full blur-xl opacity-30 animate-glow"></div>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground/80 text-lg">
            <div className="p-2 bg-card/50 rounded-full border border-border/50 shadow-prayer-soft-glow">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">Current Location</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          
          {/* Left Column - Current Time & Next Prayer */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Time */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CurrentTimeDisplay />
            </div>

            {/* Next Prayer Countdown */}
            {nextPrayer && (
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <NextPrayerCountdown 
                  nextPrayerName={nextPrayer.name}
                  nextPrayerTime={nextPrayer.date}
                />
              </div>
            )}
          </div>

          {/* Right Column - Alarm Controls */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <AlarmControls />
          </div>
        </div>

        {/* Prayer Times Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Today's Prayer Schedule</h2>
            <div className="w-24 h-1 bg-prayer-accent-gradient rounded-full mx-auto"></div>
          </div>
          
          {/* Prayer Times Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {prayerTimes.map((prayer, index) => {
              const status = getCurrentPrayerStatus(prayer.date);
              return (
                <div 
                  key={prayer.name}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <PrayerTimeCard
                    name={prayer.name}
                    time={prayer.time}
                    isNext={status.isNext}
                    isPassed={status.isPassed}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Qibla Direction */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="inline-flex items-center gap-4 bg-card/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-prayer-card">
            <div className="p-3 bg-primary/10 rounded-full">
              <Compass className="w-6 h-6 text-primary animate-glow" />
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Qibla Direction</div>
              <div className="text-xl font-bold text-foreground">57° Northeast</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
