import {
  MessageCardTemplateData, MyAccountInfoData,
  LegacyProductData,
  LegacyProductDetailData,
  ThemeData, ProductData,
} from '@/dto';

export interface RankingProductsResponse {
  products: LegacyProductData[];
}

export interface ThemesResponse {
  themes: ThemeData[];
}

export type CategoryResponse = ThemeData[];

export interface LegacyThemeProductsResponse {
  products: LegacyProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface ThemeProductsResponse {
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

export interface ProductDetailResponse {
  detail: LegacyProductDetailData;
}

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
