import React from 'react';
import { Timer } from '../types';
import { useTimerContext } from '../contexts/TimerContext';
import { formatTime, calculateProgress } from '../utils/timerUtils';
import ProgressBar from './ProgressBar';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

interface TimerItemProps {
  timer: Timer;
}

const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { dispatch } = useTimerContext();

  const handleStart = () => {
    dispatch({ type: 'START_TIMER', payload: timer.id });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE_TIMER', payload: timer.id });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_TIMER', payload: timer.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TIMER', payload: timer.id });
  };

  const progress = calculateProgress(timer.remainingTime, timer.duration);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{timer.name}</h3>
        <div className="flex items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full mr-2 ${
              timer.status === 'running'
                ? 'bg-blue-100 text-blue-800'
                : timer.status === 'paused'
                ? 'bg-amber-100 text-amber-800'
                : timer.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
          </span>
          {timer.halfwayAlert && !timer.halfwayAlertTriggered && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Alert at 50%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-2">
          <ProgressBar progress={progress} status={timer.status} />
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="text-2xl font-bold text-gray-900">
            {formatTime(timer.remainingTime)}
          </div>
          
          <div className="flex space-x-2">
            {timer.status === 'running' ? (
              <button
                onClick={handlePause}
                className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                aria-label="Pause timer"
              >
                <Pause size={16} />
              </button>
            ) : timer.status !== 'completed' ? (
              <button
                onClick={handleStart}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Start timer"
              >
                <Play size={16} />
              </button>
            ) : null}
            
            <button
              onClick={handleReset}
              className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              aria-label="Reset timer"
            >
              <RotateCcw size={16} />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Delete timer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerItem;