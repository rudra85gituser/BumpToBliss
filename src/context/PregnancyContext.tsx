import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PregnancyContextType } from '../types/GarbhaSanskar';
import { useAuth } from './AuthContext';
import { getUserProfile, upsertUserProfile } from '@/src/services/userDataService';
import {
  calculatePregnancyDay as calculatePregnancyDayUtil,
  calculatePregnancyWeek as calculatePregnancyWeekUtil,
} from '@/src/utils/pregnancyCalculations';

const PregnancyContext = createContext<PregnancyContextType | undefined>(undefined);

export const PregnancyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pregnancyStartDate, setPregnancyStartDateState] = useState<Date | null>(null);
  const [pregnancyDay, setPregnancyDay] = useState<number | null>(null);
  const [pregnancyWeek, setPregnancyWeek] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculatePregnancyDay = calculatePregnancyDayUtil;
  const calculatePregnancyWeek = calculatePregnancyWeekUtil;

  useEffect(() => {
    if (!user) {
      Promise.resolve().then(() => {
        setPregnancyStartDateState(null);
        setPregnancyDay(null);
        setPregnancyWeek(null);
        setIsLoading(false);
      });
      return;
    }

    getUserProfile(user.id)
      .then((profile) => {
        if (!profile?.conception_date) return;

        const date = new Date(profile.conception_date);
        if (Number.isNaN(date.getTime())) return;

        setPregnancyStartDateState(date);
        const day = calculatePregnancyDay(date);
        const week = calculatePregnancyWeek(date);
        setPregnancyDay(day);
        setPregnancyWeek(week);
      })
      .finally(() => setIsLoading(false));
  }, [calculatePregnancyDay, calculatePregnancyWeek, user]);

  const setPregnancyStartDate = useCallback((date: Date) => {
    setPregnancyStartDateState(date);
    const day = calculatePregnancyDay(date);
    const week = calculatePregnancyWeek(date);
    setPregnancyDay(day);
    setPregnancyWeek(week);

    if (user) {
      upsertUserProfile(user.id, {
        email: user.email,
        conception_day: date.getDate(),
        conception_month: date.getMonth(),
        conception_year: date.getFullYear(),
        conception_date: date.toISOString(),
      });
    }
  }, [calculatePregnancyDay, calculatePregnancyWeek, user]);

  const value: PregnancyContextType = {
    pregnancyStartDate,
    pregnancyDay,
    pregnancyWeek,
    isLoading,
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
