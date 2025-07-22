import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export function usePrayerAlarm() {
  const [settings, setSettings] = useState({
    enabled: true,
    volume: 0.7
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
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

  const playAlarm = async (prayerName) => {
    if (!settings.enabled) return;

    try {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800 Hz tone
      gainNode.gain.setValueAtTime(settings.volume, audioContext.currentTime);
      
      setIsPlaying(true);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 2); // Play for 2 seconds
      
      // Show notification
      toast({
        title: `${prayerName} Prayer Time`,
        description: "It's time for prayer",
        duration: 5000,
      });

      // Auto-stop after 2 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);

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

  const updateSettings = (newSettings) => {
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