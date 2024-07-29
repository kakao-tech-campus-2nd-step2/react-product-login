import { WishData } from '@/types/wishType';

type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type Pagination = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

export type WishListRequestParams = {
  pageToken?: string;
  maxResults?: number;
};

export type WishListResponse = {
  wishList: WishData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type WishListResponseRaw = {
  content: WishData[];
  pageable: Pagination;
  totalPage: number;
  totalElements: number;
  last: false;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
