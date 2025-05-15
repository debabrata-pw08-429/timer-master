import React, { useState } from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import { generateId } from '../utils/timerUtils';
import { Clock, Tag, PlusCircle } from 'lucide-react';

const TimerForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [error, setError] = useState('');
  
  const { state, dispatch } = useTimerContext();
  
  // Get unique categories from existing timers
  const categories = [...new Set(state.timers.map((timer) => timer.category))];

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total duration in seconds
    const duration = hours * 3600 + minutes * 60 + seconds;
    
    // Validation
    if (!name.trim()) {
      setError('Timer name is required');
      return;
    }
    
    if (duration <= 0) {
      setError('Timer duration must be greater than 0');
      return;
    }
    
    if (!category.trim()) {
      setError('Category is required');
      return;
    }
    
    // Create new timer
    const newTimer = {
      id: generateId(),
      name: name.trim(),
      duration,
      category: category.trim(),
      status: 'idle' as const,
      remainingTime: duration,
      halfwayAlert,
      halfwayAlertTriggered: false,
      createdAt: Date.now(),
    };
    
    // Add to state
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    
    // Clear form
    setName('');
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setCategory('');
    setHalfwayAlert(false);
    setError('');
    setIsExpanded(false);
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div
        className="p-4 bg-blue-500 text-white cursor-pointer flex justify-between items-center"
        onClick={toggleForm}
      >
        <h2 className="text-lg font-semibold">Add New Timer</h2>
        <PlusCircle size={20} className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Timer Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Workout Timer"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Duration</label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="text-sm text-gray-600" htmlFor="hours">
                  Hours
                </label>
                <input
                  type="number"
                  id="hours"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600" htmlFor="minutes">
                  Minutes
                </label>
                <input
                  type="number"
                  id="minutes"
                  min="0"
                  max="59"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600" htmlFor="seconds">
                  Seconds
                </label>
                <input
                  type="number"
                  id="seconds"
                  min="0"
                  max="59"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <div className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Workout"
                  list="category-list"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <datalist id="category-list">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                <Tag size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Choose from existing categories or create a new one
            </p>
          </div>
          
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="halfway-alert"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={halfwayAlert}
              onChange={(e) => setHalfwayAlert(e.target.checked)}
            />
            <label className="ml-2 text-gray-700" htmlFor="halfway-alert">
              Enable halfway alert
            </label>
            <Clock size={16} className="ml-2 text-gray-500" />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              onClick={toggleForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Timer
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TimerForm;