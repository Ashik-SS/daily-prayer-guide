import { Card } from "@/components/ui/card";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isNext: boolean;
  isPassed: boolean;
}

export function PrayerTimeCard({ name, time, isNext, isPassed }: PrayerTimeCardProps) {
  return (
    <Card 
      className={`
        p-4 bg-prayer-card-gradient border-border/50 shadow-prayer-card
        transition-all duration-300 hover:shadow-prayer-glow
        ${isNext ? 'ring-2 ring-primary shadow-prayer-glow' : ''}
        ${isPassed ? 'opacity-60' : ''}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className={`font-semibold text-lg ${isNext ? 'text-primary' : 'text-foreground'}`}>
            {name}
          </h3>
          {isNext && (
            <span className="text-xs text-primary/80 font-medium">Next Prayer</span>
          )}
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${isNext ? 'text-primary' : 'text-foreground'}`}>
            {time}
          </p>
        </div>
      </div>
    </Card>
  );
}