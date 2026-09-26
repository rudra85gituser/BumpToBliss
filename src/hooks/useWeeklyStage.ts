import { useCallback, useEffect, useState } from "react";
import { PregnancyStage } from "../types/GarbhaSanskar";
import { fetchPregnancyStageByWeek } from "../services/momAndBabyService";

type WeeklyStageState = {
  stage: PregnancyStage | null;
  loading: boolean;
  error: string | null;
};

export const useWeeklyStage = (weekNumber: number) => {
  const [state, setState] = useState<WeeklyStageState>({
    stage: null,
    loading: true,
    error: null,
  });

  const loadStage = useCallback(async () => {
    if (!weekNumber || weekNumber < 1) return;

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const stage = await fetchPregnancyStageByWeek(weekNumber);
      setState({ stage, loading: false, error: null });
    } catch {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Failed to load week data. Please try again.",
      }));
    }
  }, [weekNumber]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadStage();
    }, 0);
    return () => clearTimeout(timeout);
  }, [loadStage]);

  return { ...state, refetch: loadStage };
};
