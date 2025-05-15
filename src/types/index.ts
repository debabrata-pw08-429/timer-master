export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  category: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
  remainingTime: number; // in seconds
  halfwayAlert: boolean;
  halfwayAlertTriggered: boolean;
  createdAt: number;
}

export interface TimerLog {
  id: string;
  timerId: string;
  name: string;
  category: string;
  duration: number;
  completedAt: number;
}

export interface CategoryTimers {
  [category: string]: Timer[];
}