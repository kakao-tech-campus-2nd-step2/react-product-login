import { BACKEND_API } from '@/api/config';
import { getCategoriesPath } from '@/api/services/path';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { CategoryData } from '@/types/categoryType';

type CategoryResponse = CategoryData[];

export const fetchCategories = async () => {
  try {
    const response =
      await BACKEND_API.get<CategoryResponse>(getCategoriesPath());

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
