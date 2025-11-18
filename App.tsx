import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import CreateLetter from './screens/CreateLetter';
import History from './screens/History';
import Settings from './screens/Settings';
import type { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  // FIX: Changed JSX.Element to React.ReactElement to fix 'Cannot find namespace JSX' error.
  const renderView = useCallback((): React.ReactElement => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setView={setCurrentView} />;
      case 'create-letter':
        return <CreateLetter />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  }, [currentView]);

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;