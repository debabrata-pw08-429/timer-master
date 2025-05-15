import React from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import { groupTimersByCategory } from '../utils/timerUtils';
import CategoryGroup from './CategoryGroup';
import { ClipboardList } from 'lucide-react';

const TimerList: React.FC = () => {
  const { state } = useTimerContext();
  const { timers } = state;
  
  const groupedTimers = groupTimersByCategory(timers);
  const categories = Object.keys(groupedTimers);
  
  if (timers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ClipboardList size={48} className="mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No timers yet</h3>
        <p className="text-gray-500">
          Create a new timer by clicking the "Add New Timer" button above.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {categories.map((category) => (
        <CategoryGroup
          key={category}
          category={category}
          timers={groupedTimers[category]}
        />
      ))}
    </div>
  );
};

export default TimerList;