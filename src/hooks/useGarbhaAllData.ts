import { useCallback, useEffect, useState } from 'react';
import { GarbhaSanskarService } from '../services/garbhaSanskarService';
import {
    GarbhaContent,
    GarbhaSection,
    GarbhaSubsection,
} from '../types/GarbhaSanskar';

export type SectionWithSubsections = {
  section: GarbhaSection;
  subsections: {
    subsection: GarbhaSubsection;
    contents: GarbhaContent[];
  }[];
};

type GarbhaDataState = {
  loading: boolean;
  error: string | null;
  sections: GarbhaSection[] | null;
  subsections: GarbhaSubsection[] | null;
  content: GarbhaContent[] | null;
  organizedData: SectionWithSubsections[] | null;
};

export const useGarbhaAllData = (
  pregnancyDay: number | null,
  pregnancyWeek: number | null
) => {
  const [state, setState] = useState<GarbhaDataState>({
    loading: false,
    error: null,
    sections: null,
    subsections: null,
    content: null,
    organizedData: null,
  });

  const organizeContent = useCallback(
    (
      sections: GarbhaSection[],
      content: GarbhaContent[]
    ): SectionWithSubsections[] => {
      const sectionMap = new Map<number, Map<number, GarbhaContent[]>>();

      content.forEach((item) => {
        const sectionId = item.garbha_sanskar_section?.id;
        const subsectionId = item.garbha_sanskar_subsection?.id;

        if (!sectionId || !subsectionId) return;

        if (!sectionMap.has(sectionId)) {
          sectionMap.set(sectionId, new Map());
        }

        const subsectionMap = sectionMap.get(sectionId)!;
        if (!subsectionMap.has(subsectionId)) {
          subsectionMap.set(subsectionId, []);
        }
        subsectionMap.get(subsectionId)!.push(item);
      });

      return sections
        .map((section) => {
          const subsectionMap = sectionMap.get(section.id);
          if (!subsectionMap || subsectionMap.size === 0) return null;

          return {
            section,
            subsections: Array.from(subsectionMap.entries()).map(
              ([subsectionId, contents]) => ({
                subsection: contents[0]?.garbha_sanskar_subsection || ({} as GarbhaSubsection),
                contents,
              })
            ),
          };
        })
        .filter((item): item is SectionWithSubsections => item !== null);
    },
    []
  );

  const fetchAllData = useCallback(async () => {
    await Promise.resolve();

    if (pregnancyDay === null || pregnancyWeek === null) {
      setState((s) => ({
        ...s,
        loading: false,
        error: 'Invalid pregnancy day or week',
      }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      // Fetch all data in parallel
      const [sectionsRes, subsectionsRes, contentRes] = await Promise.all([
        GarbhaSanskarService.fetchSections(),
        GarbhaSanskarService.fetchSubsections(),
        GarbhaSanskarService.fetchAllContent(pregnancyDay, pregnancyWeek),
      ]);

      const sections = sectionsRes.data.data || [];
      const subsections = subsectionsRes.data.data || [];


      // Organize content by section and subsection
      const organized = organizeContent(sections, contentRes);

      setState({
        loading: false,
        error: null,
        sections,
        subsections,
        content: contentRes,
        organizedData: organized,
      });
    } catch (err: any) {

      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.statusText ||
        err.message ||
        'Failed to fetch data';

      setState({
        loading: false,
        error: `Error: ${errorMessage}`,
        sections: null,
        subsections: null,
        content: null,
        organizedData: null,
      });
    }
  }, [pregnancyDay, pregnancyWeek, organizeContent]);

  useEffect(() => {
    if (pregnancyDay !== null && pregnancyWeek !== null) {
      const timeout = setTimeout(() => {
        fetchAllData();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [pregnancyDay, pregnancyWeek, fetchAllData]);

  return {
    ...state,
    refetch: fetchAllData,
  };
};
