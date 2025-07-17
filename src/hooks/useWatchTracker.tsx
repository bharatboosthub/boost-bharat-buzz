import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface WatchSession {
  videoId: string;
  startTime: number;
  endTime?: number;
  watchDuration: number;
  isEligible: boolean;
}

export const useWatchTracker = () => {
  const [currentSession, setCurrentSession] = useState<WatchSession | null>(null);
  const [watchSessions, setWatchSessions] = useState<WatchSession[]>([]);

  useEffect(() => {
    // Load previous watch sessions
    const savedSessions = localStorage.getItem('watchSessions');
    if (savedSessions) {
      setWatchSessions(JSON.parse(savedSessions));
    }
  }, []);

  const startWatchSession = useCallback((videoId: string) => {
    const session: WatchSession = {
      videoId,
      startTime: Date.now(),
      watchDuration: 0,
      isEligible: false
    };
    setCurrentSession(session);
    
    // Redirect to YouTube with autoplay
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}&autoplay=1`;
    window.open(youtubeUrl, '_blank');
    
    toast({
      title: "Video opened in YouTube",
      description: "Watch for at least 3 minutes to earn coins. We'll track when you return!",
    });
  }, []);

  const endWatchSession = useCallback(() => {
    if (!currentSession) return null;

    const endTime = Date.now();
    const watchDuration = endTime - currentSession.startTime;
    const isEligible = watchDuration >= 180000; // 3 minutes

    const completedSession: WatchSession = {
      ...currentSession,
      endTime,
      watchDuration,
      isEligible
    };

    const updatedSessions = [...watchSessions, completedSession];
    setWatchSessions(updatedSessions);
    localStorage.setItem('watchSessions', JSON.stringify(updatedSessions));
    setCurrentSession(null);

    return completedSession;
  }, [currentSession, watchSessions]);

  const hasWatchedVideo = useCallback((videoId: string) => {
    return watchSessions.some(session => 
      session.videoId === videoId && session.isEligible
    );
  }, [watchSessions]);

  const getWatchedVideos = useCallback(() => {
    return watchSessions
      .filter(session => session.isEligible)
      .map(session => session.videoId);
  }, [watchSessions]);

  return {
    startWatchSession,
    endWatchSession,
    hasWatchedVideo,
    getWatchedVideos,
    currentSession,
    watchSessions
  };
};