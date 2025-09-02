import React from 'react';
import { RoomsManagement } from '../modules/GestionHotel/components/RoomsManagement';

export const RoomsPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <RoomsManagement />
    </div>
  );
};