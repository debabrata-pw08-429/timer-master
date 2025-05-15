import React, { useState } from 'react';
import { Timer } from '../types';
import TimerItem from './TimerItem';
import { useTimerContext } from '../contexts/TimerContext';
import { ChevronDown, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ category, timers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { dispatch } = useTimerContext();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartAll = () => {
    dispatch({ type: 'START_CATEGORY', payload: category });
  };

  const handlePauseAll = () => {
    dispatch({ type: 'PAUSE_CATEGORY', payload: category });
  };

  const handleResetAll = () => {
    dispatch({ type: 'RESET_CATEGORY', payload: category });
  };

  const runningCount = timers.filter((timer) => timer.status === 'running').length;
  const completedCount = timers.filter((timer) => timer.status === 'completed').length;

  return (
    <div className="mb-4 bg-gray-50 rounded-lg p-2">
      <div className="flex justify-between items-center p-3 cursor-pointer" onClick={toggleExpanded}>
        <div className="flex items-center">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          <h2 className="text-lg font-semibold ml-2">{category}</h2>
          <div className="ml-3 flex space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Running: {runningCount}
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Completed: {completedCount}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStartAll();
            }}
            className="p-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
          >
            <Play size={14} className="mr-1" /> Start All
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePauseAll();
            }}
            className="p-2 text-xs bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors flex items-center"
          >
            <Pause size={14} className="mr-1" /> Pause All
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResetAll();
            }}
            className="p-2 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center"
          >
            <RotateCcw size={14} className="mr-1" /> Reset All
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="pl-8 pr-3 pb-3 pt-1">
          {timers.map((timer) => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
          {timers.length === 0 && (
            <p className="text-gray-500 italic">No timers in this category</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryGroup;