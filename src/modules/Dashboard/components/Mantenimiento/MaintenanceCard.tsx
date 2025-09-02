import React from 'react';

interface MaintenanceCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`
      bg-gradient-to-br from-slate-800/40 to-slate-700/40 
      backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-lg 
      ${className}
    `}>
      {children}
    </div>
  );
};
