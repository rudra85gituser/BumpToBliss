const MAX_PREGNANCY_DAYS = 280;

export const calculatePregnancyDay = (startDate: Date): number => {
  const today = new Date();
  const timeDiff = today.getTime() - startDate.getTime();
  const day = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  return Math.max(1, Math.min(day, MAX_PREGNANCY_DAYS));
};

export const calculatePregnancyWeek = (startDate: Date): number => {
  const day = calculatePregnancyDay(startDate);
  return Math.floor(day / 7);
};

export const calculateDueInWeeks = (startDate: Date): number => {
  const totalWeeks = Math.ceil(MAX_PREGNANCY_DAYS / 7);
  return Math.max(0, totalWeeks - calculatePregnancyWeek(startDate));
};
