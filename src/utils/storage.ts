import { Timer, TimerLog } from '../types';

// Timer storage functions
export const saveTimers = (timers: Timer[]): void => {
  localStorage.setItem('timers', JSON.stringify(timers));
};

export const getTimers = (): Timer[] => {
  const timers = localStorage.getItem('timers');
  return timers ? JSON.parse(timers) : [];
};

// Log storage functions
export const saveLogs = (logs: TimerLog[]): void => {
  localStorage.setItem('timerLogs', JSON.stringify(logs));
};

export const getLogs = (): TimerLog[] => {
  const logs = localStorage.getItem('timerLogs');
  return logs ? JSON.parse(logs) : [];
};