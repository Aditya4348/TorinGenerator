import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  // FIX: Changed JSX.Element to React.ReactElement to fix 'Cannot find namespace JSX' error.
  icon?: React.ReactElement;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          {icon && <span className="text-blue-600">{icon}</span>}
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;