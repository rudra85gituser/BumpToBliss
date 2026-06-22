import { useCallback, useEffect, useState } from 'react';
import { GarbhaSanskarService } from '../services/garbhaSanskarService';
import { GarbhaContent } from '../types/GarbhaSanskar';

type ContentFetchState = {
  loading: boolean;
  error: string | null;
  data: GarbhaContent[] | null;
};

export const useGarbhaSanskarContent = (pregnancyDay: number | null) => {
  const [state, setState] = useState<ContentFetchState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchContent = useCallback(async () => {
    if (pregnancyDay === null || pregnancyDay < 1 || pregnancyDay > 280) {
      setState({ loading: false, error: 'Invalid pregnancy day', data: null });
      return;
    }

    setState({ loading: true, error: null, data: null });
    try {
      const response = await GarbhaSanskarService.fetchContentByDay(pregnancyDay);


      const contents = response.data.data || response.data || [];
      setState({
        loading: false,
        error: null,
        data: Array.isArray(contents) ? contents : [],
      });
    } catch (err: any) {

      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.statusText ||
        err.message ||
        'Failed to fetch content';

      setState({
        loading: false,
        error: `API Error: ${errorMessage}`,
        data: null,
      });
    }
  }, [pregnancyDay]);

  useEffect(() => {
    if (pregnancyDay !== null) {
      fetchContent();
    }
  }, [pregnancyDay, fetchContent]);

  return {
    ...state,
    refetch: fetchContent,
  };
};
