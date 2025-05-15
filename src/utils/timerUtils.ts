import { Timer, CategoryTimers } from '../types';

// Format seconds to MM:SS or HH:MM:SS
export const formatTime = (seconds: number): string => {
  if (seconds < 0) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

// Group timers by category
export const groupTimersByCategory = (timers: Timer[]): CategoryTimers => {
  return timers.reduce((acc: CategoryTimers, timer: Timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});
};

// Calculate progress percentage
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.max(0, Math.min(100, ((total - current) / total) * 100));
};

// Generate a unique ID
export const generateId = (): string => {
  return `timer-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Format date to readable string
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};