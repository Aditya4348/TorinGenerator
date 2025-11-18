import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import type { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} currentView={currentView} setView={setView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;