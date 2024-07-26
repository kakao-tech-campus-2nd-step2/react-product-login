import { ProductData, ThemeData, MessageCardTemplateData } from './dataTypes';

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

export interface ProductDetailResponse {
  detail: ProductData & {
    isAccessableProductPage: boolean;
    review: {
      averageRating: number;
      totalReviewCount: number;
    };
    productDescription: {
      displayImage: string;
    };
    productDetailInfo: {
      announcements: {
        name: string;
        value: string;
        displayOrder: number;
      }[];
      terms: {
        displayCode: string;
        title: string;
        description: string;
      }[];
    };
  };
}

export interface ProductOptionResponse {
  options: {
    giftOrderLimit: number;
    hasOption: boolean;
    names: string[];
    options: string[];
    productId: number;
    productName: string;
    productPrice: number;
  };
}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

export interface MyAccountWishProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
