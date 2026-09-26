// src/services/momAndBabyService.ts
import axiosInstance from "../config/AxiosConfig";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

export const fetchMomAndBabySections = async () => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.MOM_AND_BABY_SECTIONS,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Mom and Baby Sections:", error);
    throw error;
  }
};

export const fetchMomAndBabyGenerals = async (
  pregnancyDay: number,
  pregnancyWeek: number,
) => {
  try {
    const endpoint = pregnancyDay
      ? API_ENDPOINTS.MOM_AND_BABY_GENERALS_BY_DAY(pregnancyDay)
      : API_ENDPOINTS.MOM_AND_BABY_GENERALS_BY_WEEK(pregnancyWeek);

    const response = await axiosInstance.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Mom and Baby Generals:", error);
    throw error;
  }
};

export const fetchMomAndBabyContents = async (
  pregnancyDay: number,
  pregnancyWeek: number,
) => {
  try {
    const endpoint = pregnancyDay
      ? API_ENDPOINTS.MOM_AND_BABY_CONTENTS_BY_DAY(pregnancyDay)
      : API_ENDPOINTS.MOM_AND_BABY_CONTENTS_BY_WEEK(pregnancyWeek);

    const response = await axiosInstance.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Mom and Baby Contents:", error);
    throw error;
  }
};

export const fetchPregnancyStageByWeek = async (weekNumber: number) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PREGNANCY_STAGE_BY_WEEK(weekNumber),
    );
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching pregnancy stage:", error);
    throw error;
  }
};
