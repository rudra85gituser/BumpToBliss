import { useMemo } from 'react';
import { GarbhaContent, GroupedContent, GarbhaSection } from '../types/GarbhaSanskar';

export const usePregnancyCalculation = (startDate: Date | null) => {
  return useMemo(() => {
    if (!startDate) return { day: null, week: null };

    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const day = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    const normalizedDay = Math.max(1, Math.min(day, 280));
    const week = Math.floor(normalizedDay / 7);

    return { day: normalizedDay, week };
  }, [startDate]);
};

export const useGroupedGarbhaContent = (contents: GarbhaContent[] | null) => {
  return useMemo(() => {
    if (!contents || contents.length === 0) return [];

    const sectionMap = new Map<number, GroupedContent>();

    contents.forEach((content) => {
      const sectionId = content.garbha_sanskar_section.id;

      if (!sectionMap.has(sectionId)) {
        sectionMap.set(sectionId, {
          section: content.garbha_sanskar_section,
          subsections: [],
        });
      }

      const grouped = sectionMap.get(sectionId)!;
      const subsectionData = grouped.subsections.find(
        (s) => s.subsection.id === content.garbha_sanskar_subsection.id
      );

      if (subsectionData) {
        subsectionData.contents.push(content);
      } else {
        grouped.subsections.push({
          subsection: content.garbha_sanskar_subsection,
          contents: [content],
        });
      }
    });

    return Array.from(sectionMap.values());
  }, [contents]);
};
