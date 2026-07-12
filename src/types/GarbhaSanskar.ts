export type StrapiImage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, any>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
};

export type GarbhaSection = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  garbha_sanskar_subsections?: Pick<GarbhaSubsection, 'id' | 'title'>[];
};

export type GarbhaSubsection = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  section: GarbhaSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type PregnancyStage = {
  id: number;
  documentId: string;
  stageNumber: number;
  stageType: 'day' | 'week' | 'month';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type GarbhaContent = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  content: string;
  duration: number | null;
  durationMinutes?: number | null;
  category: 'All' | 'Emotional' | 'Physical' | 'Spiritual';
  contentType: 'video' | 'article' | 'activity' | 'affirmation';
  contentsType?: 'video' | 'article' | 'activity' | 'affirmation';
  shortDescription?: string | null;
  pregnancy_stage: PregnancyStage;
  garbha_sanskar_section: GarbhaSection;
  garbha_sanskar_subsection: GarbhaSubsection;
  thumbnail: StrapiImage | null;
  media: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type GroupedContent = {
  section: GarbhaSection;
  subsections: {
    subsection: GarbhaSubsection;
    contents: GarbhaContent[];
  }[];
};

export type StrapiResponse<T> = {
  data: T[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type PregnancyContextType = {
  pregnancyStartDate: Date | null;
  pregnancyDay: number | null;
  pregnancyWeek: number | null;
  setPregnancyStartDate: (date: Date) => void;
  calculatePregnancyDay: (startDate: Date) => number;
  calculatePregnancyWeek: (startDate: Date) => number;
};
