export const API_ENDPOINTS = {
  // --- GARBHA SANSKAR ENDPOINTS ---
  GARBHA_SECTIONS: "/garbha-sanskar-sections?populate=*",
  GARBHA_SUBSECTIONS: "/garbha-sanskar-subsections?populate=*",
  GARBHA_CONTENTS_BY_DAY: (pregnancyDay: number) =>
    `/garbha-sanskar-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyDay}&populate=*`,
  GARBHA_CONTENTS_BY_WEEK: (pregnancyWeek: number) =>
    `/garbha-sanskar-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyWeek}&populate=*`,

  // --- MOM AND BABY ENDPOINTS ---
  MOM_AND_BABY_SECTIONS: "/mom-and-baby-sections?populate=*",

  MOM_AND_BABY_GENERALS_BY_DAY: (pregnancyDay: number) =>
    `/mom-and-baby-generals?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyDay}&populate=*`,
  MOM_AND_BABY_GENERALS_BY_WEEK: (pregnancyWeek: number) =>
    `/mom-and-baby-generals?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyWeek}&populate=*`,

  MOM_AND_BABY_CONTENTS_BY_DAY: (pregnancyDay: number) =>
    `/mom-and-baby-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyDay}&populate=*`,
  MOM_AND_BABY_CONTENTS_BY_WEEK: (pregnancyWeek: number) =>
    `/mom-and-baby-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyWeek}&populate=*`,

  PREGNANCY_STAGE_BY_WEEK: (weekNumber: number) =>
    `/pregnancy-stages?filters[stageNumber][$eq]=${weekNumber}&filters[stageType][$eq]=week&populate=*`,
};

export const STORAGE_KEYS = {
  PREGNANCY_START_DATE: "pregnancyStartDate",
  PREGNANCY_DAY: "pregnancyDay",
  PREGNANCY_WEEK: "pregnancyWeek",
};
