import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export interface JobEvent {
  jobId: string;
  type: 'job_progress';
  status: 'started' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string;
  timestamp: string;
}

export function useJobEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<JobEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) {
      console.log('[SSE] No user session, skipping connection');
      return;
    }

    console.log('[SSE] Connecting to SSE for user:', session.user.id);
    
    // Connect to SSE endpoint when app loads with valid session
    const eventSource = new EventSource(`/api/events/${session.user.id}`);

    eventSource.onopen = () => {
      console.log('[SSE] Connection opened successfully');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      console.log('[SSE] Received message:', event.data);
      try {
        const data = JSON.parse(event.data);
        console.log('[SSE] Parsed data:', data);
        
        if (data.type === 'connected') {
          console.log('[SSE] Connection confirmed by server');
        } else if (data.type === 'job_progress') {
          console.log('[SSE] Job progress received:', data);
          setEvents(prev => {
            // Update existing event or add new one
            const existingIndex = prev.findIndex(e => e.jobId === data.jobId);
            if (existingIndex >= 0) {
              const updated = [...prev];
              updated[existingIndex] = data;
              console.log('[SSE] Updated existing job:', updated);
              return updated;
            } else {
              const newEvents = [...prev, data];
              console.log('[SSE] Added new job:', newEvents);
              return newEvents;
            }
          });
        } else {
          console.log('[SSE] Unknown message type:', data.type);
        }
      } catch (err) {
        console.error('[SSE] Error parsing job event:', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('[SSE] Connection error:', error);
      setIsConnected(false);
    };

    return () => {
      console.log('[SSE] Closing connection');
      eventSource.close();
      setIsConnected(false);
    };
  }, [session?.user?.id]);

  const getActiveJobs = () => events.filter(e => e.status !== 'completed' && e.status !== 'failed');
  const getCompletedJobs = () => events.filter(e => e.status === 'completed' || e.status === 'failed');

  return {
    events,
    isConnected,
    activeJobs: getActiveJobs(),
    completedJobs: getCompletedJobs(),
  };
}