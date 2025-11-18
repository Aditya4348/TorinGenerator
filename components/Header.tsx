import React from 'react';
import { KarangTarunaLogo, KARANG_TARUNA_BLUE } from '../constants';

interface HeaderProps {
  toggleSidebar: () => void;
}

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <div className="flex items-center gap-3">
                 <KarangTarunaLogo className="h-8 w-8" />
                <h1 className="text-xl font-bold" style={{color: KARANG_TARUNA_BLUE}}>
                    Surat Karang Taruna
                </h1>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;