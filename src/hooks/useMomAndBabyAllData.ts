import { useCallback, useEffect, useState } from "react";
import {
  fetchMomAndBabyContents,
  fetchMomAndBabyGenerals,
  fetchMomAndBabySections,
} from "../services/momAndBabyService";
import {
  MomAndBabyContent,
  MomAndBabyGeneral,
  MomAndBabySection,
} from "../types/MomAndBaby";

type MomAndBabyDataState = {
  sections: MomAndBabySection[];
  generals: MomAndBabyGeneral[];
  content: MomAndBabyContent[];
  loading: boolean;
  error: string | null;
};

export const useMomAndBabyAllData = (
  pregnancyDay: number,
  pregnancyWeek: number,
) => {
  const [state, setState] = useState<MomAndBabyDataState>({
    sections: [],
    generals: [],
    content: [],
    loading: true,
    error: null,
  });

  const loadData = useCallback(async () => {
    if (!pregnancyDay || !pregnancyWeek) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const [sections, generals, content] = await Promise.all([
        fetchMomAndBabySections(),
        fetchMomAndBabyGenerals(pregnancyDay, pregnancyWeek),
        fetchMomAndBabyContents(pregnancyDay, pregnancyWeek),
      ]);

      setState({ sections, generals, content, loading: false, error: null });
    } catch {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Failed to load Mom & Baby data. Please try again.",
      }));
    }
  }, [pregnancyDay, pregnancyWeek]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timeout);
  }, [loadData]);

  return { ...state, refetch: loadData };
};
