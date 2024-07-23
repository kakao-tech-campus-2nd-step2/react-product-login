import {
  MessageCardTemplateData,
  MyAccountInfoData,
  LegacyProductData,
  ThemeData,
  ProductData,
  CategoryData,
} from '@/dto';

export interface RankingProductsResponse {
  products: LegacyProductData[];
}

export interface LegacyThemesResponse {
  themes: ThemeData[];
}

export type CategoryResponse = CategoryData[];

export interface LegacyThemeProductsResponse {
  products: LegacyProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface CategoryProductsResponse {
  content: ProductData[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type ProductDetailResponse = ProductData;

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse extends MyAccountInfoData {}

export interface MyWishProductsResponse {
  products: LegacyProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
