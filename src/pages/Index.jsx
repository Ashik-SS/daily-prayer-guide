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

  const getCurrentPrayerStatus = (prayerDate) => {
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
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-8 bg-prayer-intense-glow rounded-full blur-3xl opacity-20 animate-glow"></div>
            <h1 className="relative text-7xl md:text-8xl font-bold bg-prayer-emerald-gradient bg-clip-text text-transparent animate-glow leading-none">
              Prayer Times
            </h1>
            <div className="absolute inset-0 bg-prayer-gold-gradient bg-clip-text text-transparent opacity-0 animate-shimmer"></div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground/80 text-lg">
            <div className="p-3 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 shadow-prayer-card animate-pulse-glow">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground/60">Location</div>
            </div>
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
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 relative">
              Today's Prayer Schedule
              <div className="absolute -inset-2 bg-prayer-glow rounded-lg blur-xl opacity-10"></div>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-1 bg-prayer-emerald-gradient rounded-full"></div>
              <div className="w-3 h-3 bg-prayer-gold-gradient rounded-full animate-glow"></div>
              <div className="w-12 h-1 bg-prayer-emerald-gradient rounded-full"></div>
            </div>
            <p className="text-muted-foreground/70 max-w-lg mx-auto">
              Five daily prayers that guide your spiritual journey
            </p>
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
          <div className="relative group">
            <div className="absolute -inset-1 bg-prayer-emerald-gradient rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative inline-flex items-center gap-6 bg-card/90 backdrop-blur-md px-10 py-6 rounded-3xl border border-border/30 shadow-prayer-card">
              <div className="p-4 bg-prayer-emerald-gradient rounded-2xl shadow-prayer-soft-glow">
                <Compass className="w-8 h-8 text-white animate-glow" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground/80 uppercase tracking-wider">Qibla Direction</div>
                <div className="text-2xl font-bold text-foreground">57° Northeast</div>
                <div className="text-xs text-primary">Makkah, Saudi Arabia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;