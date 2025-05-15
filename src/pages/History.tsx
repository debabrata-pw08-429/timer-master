import React from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import TimerHistoryItem from '../components/TimerHistoryItem';
import { History as HistoryIcon } from 'lucide-react';

const History: React.FC = () => {
  const { state } = useTimerContext();
  const { logs } = state;
  
  // Sort logs by completion time (newest first)
  const sortedLogs = [...logs].sort((a, b) => b.completedAt - a.completedAt);
  
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <HistoryIcon size={48} className="mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No timer history yet
        </h3>
        <p className="text-gray-500">
          Complete timers to see them listed here.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Timer History</h2>
      <div>
        {sortedLogs.map((log) => (
          <TimerHistoryItem key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
};

export default History;