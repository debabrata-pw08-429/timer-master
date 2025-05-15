import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
  const getColorClass = () => {
    switch (status) {
      case 'running':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${getColorClass()} transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;