import { Volume2, VolumeX, Settings, TestTube, StopCircle, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePrayerAlarm } from '@/hooks/usePrayerAlarm';

export function AlarmControls() {
  const { settings, isPlaying, updateSettings, testAlarm, stopAlarm } = usePrayerAlarm();

  return (
    <Card className="p-4 bg-prayer-card-gradient border-border/50 shadow-prayer-card">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Alarm Settings</h3>
      </div>
      
      <div className="space-y-4">
        {/* Enable/Disable Alarm */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {settings.enabled ? (
              <Volume2 className="w-4 h-4 text-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">Prayer Alarms</span>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(enabled) => updateSettings({ enabled })}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Volume</label>
              <Slider
                value={[settings.volume * 100]}
                onValueChange={([value]) => updateSettings({ volume: value / 100 })}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-right">
                {Math.round(settings.volume * 100)}%
              </div>
            </div>

            {/* Sound Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sound</label>
              <Select
                value={settings.sound}
                onValueChange={(sound) => updateSettings({ sound })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adhan">Traditional Adhan</SelectItem>
                  <SelectItem value="bell">Bell</SelectItem>
                  <SelectItem value="chime">Chime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Test/Stop Buttons */}
            <div className="flex gap-2">
              {!isPlaying ? (
                <Button 
                  onClick={testAlarm}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Alarm
                </Button>
              ) : (
                <Button 
                  onClick={stopAlarm}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop Alarm
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}