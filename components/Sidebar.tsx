import React from 'react';
import { navigationItems, KarangTarunaLogo, KARANG_TARUNA_BLUE, KARANG_TARUNA_YELLOW } from '../constants';
import type { ViewType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setView }) => {
  const handleNavigation = (view: ViewType) => {
    setView(view);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
             <div className="flex items-center gap-3">
                 <KarangTarunaLogo className="h-10 w-10" />
                <span className="text-white text-lg font-semibold">Generator</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-300 hover:text-white">
                <CloseIcon />
            </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
            {navigationItems.map((item) => (
            <a
                key={item.name}
                href="#"
                onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.view);
                }}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentView === item.view
                    ? 'bg-amber-400 text-slate-900'
                    : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                }`}
            >
                <span className="mr-3">{item.icon}</span>
                {item.name}
            </a>
            ))}
        </nav>
        <div className="px-4 py-2 border-t border-slate-700 text-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Karang Taruna</p>
            <p>Frontend Only App</p>
        </div>
    </div>
  );
  
  return (
    <>
       <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed md:relative inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: KARANG_TARUNA_BLUE }}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;