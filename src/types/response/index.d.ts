import {
  MessageCardTemplateData, MyAccountInfoData,
  ProductData,
  ProductDetailData,
  ThemeData,
} from '@/dto';

export interface RankingProductsResponse {
  products: ProductData[];
}

export interface ThemesResponse {
  themes: ThemeData[];
}

export interface ThemeProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface ProductDetailResponse extends ProductDetailData {}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse extends MyAccountInfoData {}

export interface MyWishProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
