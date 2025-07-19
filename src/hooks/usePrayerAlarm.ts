import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AlarmSettings {
  enabled: boolean;
  volume: number;
  sound: string;
}

export function usePrayerAlarm() {
  const [settings, setSettings] = useState<AlarmSettings>({
    enabled: true,
    volume: 0.7,
    sound: 'adhan'
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('prayerAlarmSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.volume = settings.volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAlarm = async (prayerName: string) => {
    if (!settings.enabled || !audioRef.current) return;

    try {
      // In a real app, you'd use actual audio files
      // For demo, we'll use a simple tone or notification sound
      audioRef.current.src = getAudioSource(settings.sound);
      audioRef.current.volume = settings.volume;
      
      setIsPlaying(true);
      await audioRef.current.play();
      
      // Show notification
      toast({
        title: `${prayerName} Prayer Time`,
        description: "It's time for prayer",
        duration: 5000,
      });

      // Auto-stop after 30 seconds
      setTimeout(() => {
        stopAlarm();
      }, 30000);

    } catch (error) {
      console.error('Failed to play alarm:', error);
      toast({
        title: "Audio Permission Required",
        description: "Please allow audio to hear prayer alarms",
        variant: "destructive"
      });
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const updateSettings = (newSettings: Partial<AlarmSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('prayerAlarmSettings', JSON.stringify(updated));
    
    if (audioRef.current && updated.volume !== undefined) {
      audioRef.current.volume = updated.volume;
    }
  };

  const testAlarm = () => {
    playAlarm('Test');
  };

  return {
    settings,
    isPlaying,
    playAlarm,
    stopAlarm,
    updateSettings,
    testAlarm
  };
}

function getAudioSource(soundType: string): string {
  // In a real app, you'd host actual adhan/prayer call audio files
  // For demo purposes, we'll create a simple tone using data URI
  // You could replace this with actual audio file URLs
  
  const sounds: Record<string, string> = {
    adhan: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj',
    bell: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj',
    chime: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj'
  };
  
  return sounds[soundType] || sounds.adhan;
}