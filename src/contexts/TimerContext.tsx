import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { Timer, TimerLog, CategoryTimers } from '../types';
import { saveTimers, getTimers, saveLogs, getLogs } from '../utils/storage';

interface TimerState {
  timers: Timer[];
  logs: TimerLog[];
  showCompletionModal: boolean;
  completedTimer: Timer | null;
  showHalfwayAlert: boolean;
  halfwayAlertTimer: Timer | null;
}

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'COMPLETE_TIMER'; payload: Timer }
  | { type: 'TICK_TIMER'; payload: string }
  | { type: 'START_CATEGORY'; payload: string }
  | { type: 'PAUSE_CATEGORY'; payload: string }
  | { type: 'RESET_CATEGORY'; payload: string }
  | { type: 'CLOSE_COMPLETION_MODAL' }
  | { type: 'SHOW_HALFWAY_ALERT'; payload: Timer }
  | { type: 'CLOSE_HALFWAY_ALERT' }
  | { type: 'INIT_TIMERS'; payload: { timers: Timer[]; logs: TimerLog[] } };

const initialState: TimerState = {
  timers: [],
  logs: [],
  showCompletionModal: false,
  completedTimer: null,
  showHalfwayAlert: false,
  halfwayAlertTimer: null,
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };
    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: 'running' }
            : timer
        ),
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: 'paused' }
            : timer
        ),
      };
    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                status: 'idle',
                remainingTime: timer.duration,
                halfwayAlertTriggered: false,
              }
            : timer
        ),
      };
    case 'TICK_TIMER':
      const timer = state.timers.find((t) => t.id === action.payload);
      if (!timer || timer.status !== 'running') return state;

      const newRemainingTime = Math.max(0, timer.remainingTime - 1);
      const isCompleted = newRemainingTime === 0;
      const isHalfway = 
        timer.halfwayAlert && 
        !timer.halfwayAlertTriggered && 
        newRemainingTime <= timer.duration / 2;

      const updatedTimer = {
        ...timer,
        remainingTime: newRemainingTime,
        status: isCompleted ? 'completed' : timer.status,
        halfwayAlertTriggered: isHalfway ? true : timer.halfwayAlertTriggered,
      };

      const updatedTimers = state.timers.map((t) =>
        t.id === timer.id ? updatedTimer : t
      );

      // Handle timer completion
      if (isCompleted) {
        return {
          ...state,
          timers: updatedTimers,
          showCompletionModal: true,
          completedTimer: updatedTimer,
        };
      }

      // Handle halfway alert
      if (isHalfway) {
        return {
          ...state,
          timers: updatedTimers,
          showHalfwayAlert: true,
          halfwayAlertTimer: updatedTimer,
        };
      }

      return {
        ...state,
        timers: updatedTimers,
      };
    case 'COMPLETE_TIMER':
      const newLog: TimerLog = {
        id: `log-${Date.now()}`,
        timerId: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        duration: action.payload.duration,
        completedAt: Date.now(),
      };
      return {
        ...state,
        logs: [...state.logs, newLog],
      };
    case 'START_CATEGORY':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload && timer.status !== 'completed'
            ? { ...timer, status: 'running' }
            : timer
        ),
      };
    case 'PAUSE_CATEGORY':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload && timer.status === 'running'
            ? { ...timer, status: 'paused' }
            : timer
        ),
      };
    case 'RESET_CATEGORY':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload
            ? {
                ...timer,
                status: 'idle',
                remainingTime: timer.duration,
                halfwayAlertTriggered: false,
              }
            : timer
        ),
      };
    case 'CLOSE_COMPLETION_MODAL':
      return {
        ...state,
        showCompletionModal: false,
        completedTimer: null,
      };
    case 'SHOW_HALFWAY_ALERT':
      return {
        ...state,
        showHalfwayAlert: true,
        halfwayAlertTimer: action.payload,
      };
    case 'CLOSE_HALFWAY_ALERT':
      return {
        ...state,
        showHalfwayAlert: false,
        halfwayAlertTimer: null,
      };
    case 'INIT_TIMERS':
      return {
        ...state,
        timers: action.payload.timers,
        logs: action.payload.logs,
      };
    default:
      return state;
  }
}

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load timers from localStorage on initial render
  useEffect(() => {
    const loadTimers = async () => {
      const timers = await getTimers();
      const logs = await getLogs();
      dispatch({ type: 'INIT_TIMERS', payload: { timers, logs } });
    };
    loadTimers();
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    if (state.timers.length > 0) {
      saveTimers(state.timers);
    }
  }, [state.timers]);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (state.logs.length > 0) {
      saveLogs(state.logs);
    }
  }, [state.logs]);

  // Add timer to logs when completed
  useEffect(() => {
    if (state.completedTimer) {
      dispatch({ type: 'COMPLETE_TIMER', payload: state.completedTimer });
    }
  }, [state.completedTimer]);

  // Timer tick logic
  useEffect(() => {
    const runningTimers = state.timers.filter(
      (timer) => timer.status === 'running'
    );
    
    if (runningTimers.length === 0) return;
    
    const intervalId = setInterval(() => {
      runningTimers.forEach((timer) => {
        dispatch({ type: 'TICK_TIMER', payload: timer.id });
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [state.timers]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);