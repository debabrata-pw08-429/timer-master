import React, { useEffect } from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import { CheckCircle2, X } from 'lucide-react';
import { formatTime } from '../utils/timerUtils';

const CompletionModal: React.FC = () => {
  const { state, dispatch } = useTimerContext();
  const { showCompletionModal, completedTimer } = state;
  
  const handleClose = () => {
    dispatch({ type: 'CLOSE_COMPLETION_MODAL' });
  };
  
  useEffect(() => {
    if (showCompletionModal) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showCompletionModal]);
  
  if (!showCompletionModal || !completedTimer) return null;
  
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
          <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Timer Completed!</h2>
          
          <div className="mb-4">
            <p className="text-lg text-gray-700 mb-1">
              {completedTimer.name}
            </p>
            <p className="text-gray-500">
              Duration: {formatTime(completedTimer.duration)}
            </p>
            <p className="text-gray-500">
              Category: {completedTimer.category}
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;