import React, { createContext, useContext, useState, useCallback } from 'react';
import { PregnancyContextType } from '../types/GarbhaSanskar';

const PregnancyContext = createContext<PregnancyContextType | undefined>(undefined);

export const PregnancyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pregnancyStartDate, setPregnancyStartDateState] = useState<Date | null>(null);
  const [pregnancyDay, setPregnancyDay] = useState<number | null>(null);
  const [pregnancyWeek, setPregnancyWeek] = useState<number | null>(null);

  const calculatePregnancyDay = useCallback((startDate: Date): number => {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    return Math.max(1, Math.min(daysDiff, 280));
  }, []);

  const calculatePregnancyWeek = useCallback((startDate: Date): number => {
    const day = calculatePregnancyDay(startDate);
    return Math.floor(day / 7);
  }, [calculatePregnancyDay]);

  const setPregnancyStartDate = useCallback((date: Date) => {
    setPregnancyStartDateState(date);
    const day = calculatePregnancyDay(date);
    const week = calculatePregnancyWeek(date);
    setPregnancyDay(day);
    setPregnancyWeek(week);
  }, [calculatePregnancyDay, calculatePregnancyWeek]);

  const value: PregnancyContextType = {
    pregnancyStartDate,
    pregnancyDay,
    pregnancyWeek,
    setPregnancyStartDate,
    calculatePregnancyDay,
    calculatePregnancyWeek,
  };

  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  );
};

export const usePregnancy = (): PregnancyContextType => {
  const context = useContext(PregnancyContext);
  if (context === undefined) {
    throw new Error('usePregnancy must be used within PregnancyProvider');
  }
  return context;
};
