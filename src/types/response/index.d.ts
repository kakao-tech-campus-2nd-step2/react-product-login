import {
  LegacyProductData,
  ProductData,
  CategoryData,
} from '@/dto';

export interface RankingProductsResponse {
  products: LegacyProductData[];
}

export type CategoryResponse = CategoryData[];

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

export interface LoginResponse {
  email: string;
  token: string;
}

export interface RegisterResponse {
  email: string;
  token: string;
}

export interface WishedProductsResponse {
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