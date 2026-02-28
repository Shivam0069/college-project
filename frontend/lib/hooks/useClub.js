import { useContext } from 'react';
import { ClubContext } from '@/lib/contexts/ClubContext';

export const useClub = () => {
  const context = useContext(ClubContext);

  if (!context) {
    throw new Error('useClub must be used within ClubProvider');
  }

  return context;
};
