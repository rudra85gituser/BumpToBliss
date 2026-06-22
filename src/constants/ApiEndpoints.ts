export const API_ENDPOINTS = {
  GARBHA_SECTIONS: '/garbha-sanskar-sections?populate=*',
  GARBHA_SUBSECTIONS: '/garbha-sanskar-subsections?populate=*',
  GARBHA_CONTENTS_BY_DAY: (pregnancyDay: number) =>
    `/garbha-sanskar-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyDay}&populate=*`,
  GARBHA_CONTENTS_BY_WEEK: (pregnancyWeek: number) =>
    `/garbha-sanskar-contents?filters[pregnancy_stage][stageNumber][$lte]=${pregnancyWeek}&populate=*`,
};

export const STORAGE_KEYS = {
  PREGNANCY_START_DATE: 'pregnancyStartDate',
  PREGNANCY_DAY: 'pregnancyDay',
  PREGNANCY_WEEK: 'pregnancyWeek',
};
