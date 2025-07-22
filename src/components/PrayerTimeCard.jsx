import { Card } from "@/components/ui/card";

export function PrayerTimeCard({ name, time, isNext, isPassed }) {
  return (
    <Card 
      className={`
        p-4 bg-prayer-card-gradient border-border/50 shadow-prayer-card
        transition-all duration-300 hover:shadow-prayer-glow
        ${isNext ? 'ring-2 ring-primary/50 shadow-prayer-glow' : ''}
        ${isPassed ? 'opacity-60' : ''}
      `}
    >
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-foreground text-lg">{name}</h3>
        <div className="text-2xl font-bold text-primary font-mono">
          {time}
        </div>
        {isNext && (
          <div className="text-xs text-primary uppercase tracking-wider">
            Next Prayer
          </div>
        )}
        {isPassed && (
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Completed
          </div>
        )}
      </div>
    </Card>
  );
}