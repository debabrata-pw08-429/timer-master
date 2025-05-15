import React, { useEffect } from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import { Bell, X } from 'lucide-react';

const HalfwayAlertModal: React.FC = () => {
  const { state, dispatch } = useTimerContext();
  const { showHalfwayAlert, halfwayAlertTimer } = state;
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_HALFWAY_ALERT' });
  };
  
  useEffect(() => {
    if (showHalfwayAlert) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showHalfwayAlert]);
  
  if (!showHalfwayAlert || !halfwayAlertTimer) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all animate-fade-in">
        <div className="absolute top-3 right-3">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="text-center">
          <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Bell size={36} className="text-purple-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Halfway Point!</h2>
          
          <div className="mb-4">
            <p className="text-lg text-gray-700 mb-1">
              {halfwayAlertTimer.name}
            </p>
            <p className="text-gray-500">
              You're halfway through this timer
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfwayAlertModal;