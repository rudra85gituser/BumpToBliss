// src/types/MomAndBaby.ts
import { PregnancyStage, StrapiImage } from "./GarbhaSanskar";

export interface MomAndBabySection {
  id: number;
  title: string;
  MomOrBaby: "Mom" | "Baby";
  sortOrder: number;
}

export interface MomAndBabyGeneral {
  id: number;
  name: string;
  height: number;
  weight: number;
  MomOrBaby: "Mom" | "Baby";
  shortDescription?: string;
  videoUrl?: string;
  thumbnail?: StrapiImage | null;
  additionalMedia?: StrapiImage | null;
}

export interface MomAndBabyContent {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  contentsType: string;
  content: string; // Rich Text
  readTimeMinutes?: number;
  durationMinutes?: number;
  audioUrl?: string;
  videoUrl?: string;
  thumbnail?: StrapiImage | null;
  media?: StrapiImage | null;
  // Strapi v5 returns relations flattened (no .data.attributes wrapper),
  // confirmed against the live API response.
  mom_and_baby_section?: MomAndBabySection | null;
  pregnancy_stage?: PregnancyStage | null;
}
