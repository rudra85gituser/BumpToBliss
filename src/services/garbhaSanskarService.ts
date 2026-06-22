import { AxiosResponse } from 'axios';
import axiosInstance from '../config/AxiosConfig';
import { API_ENDPOINTS } from '../constants/ApiEndpoints';
import {
    GarbhaContent,
    GarbhaSection,
    GarbhaSubsection,
    StrapiResponse,
} from '../types/GarbhaSanskar';

export class GarbhaSanskarService {
  static async fetchSections(): Promise<AxiosResponse<StrapiResponse<GarbhaSection>>> {
    return axiosInstance.get(API_ENDPOINTS.GARBHA_SECTIONS);
  }

  static async fetchSubsections(): Promise<AxiosResponse<StrapiResponse<GarbhaSubsection>>> {
    return axiosInstance.get(API_ENDPOINTS.GARBHA_SUBSECTIONS);
  }

  static async fetchContentByDay(
    pregnancyDay: number
  ): Promise<AxiosResponse<StrapiResponse<GarbhaContent>>> {
    return axiosInstance.get(API_ENDPOINTS.GARBHA_CONTENTS_BY_DAY(pregnancyDay));
  }

  static async fetchContentByWeek(
    pregnancyWeek: number
  ): Promise<AxiosResponse<StrapiResponse<GarbhaContent>>> {
    return axiosInstance.get(API_ENDPOINTS.GARBHA_CONTENTS_BY_WEEK(pregnancyWeek));
  }

  static async fetchAllContent(
    pregnancyDay: number,
    pregnancyWeek: number
  ): Promise<GarbhaContent[]> {
    try {
      const [dayResponse, weekResponse] = await Promise.all([
        this.fetchContentByDay(pregnancyDay),
        this.fetchContentByWeek(pregnancyWeek),
      ]);

      const dayContent = dayResponse.data.data || [];
      const weekContent = weekResponse.data.data || [];

      // Combine and deduplicate by ID
      const allContent = [...dayContent, ...weekContent];
      const uniqueContent = Array.from(
        new Map(allContent.map((item) => [item.id, item])).values()
      );

      return uniqueContent;
    } catch (error) {
      throw error;
    }
  }
}

