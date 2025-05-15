import React from 'react';
import { TimerLog } from '../types';
import { formatDate } from '../utils/timerUtils';
import { Clock, Calendar } from 'lucide-react';

interface TimerHistoryItemProps {
  log: TimerLog;
}

const TimerHistoryItem: React.FC<TimerHistoryItemProps> = ({ log }) => {
  const formattedDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    
    return parts.join(' ');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{log.name}</h3>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs">
              {log.category}
            </span>
            <div className="flex items-center ml-3">
              <Clock size={14} className="mr-1" />
              <span>{formattedDuration(log.duration)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(log.completedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimerHistoryItem;