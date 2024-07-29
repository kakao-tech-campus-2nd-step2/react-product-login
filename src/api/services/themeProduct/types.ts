import { ProductData } from '@/types/productType';

export type ProductsRequestParams = {
  categoryId: number;
  pageToken?: string;
  maxResults?: number;
};

export type ProductsResponse = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type ProductsResponseRaw = {
  content: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};
