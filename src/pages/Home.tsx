import React from 'react';
import TimerForm from '../components/TimerForm';
import TimerList from '../components/TimerList';
import CompletionModal from '../components/CompletionModal';
import HalfwayAlertModal from '../components/HalfwayAlertModal';

const Home: React.FC = () => {
  return (
    <div>
      <TimerForm />
      <TimerList />
      <CompletionModal />
      <HalfwayAlertModal />
    </div>
  );
};

export default Home;