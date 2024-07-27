import { AUTHROIZATION_API } from '@/api/config';
import {
  getWishAddPath,
  getWishDeletePath,
  getWishListPath,
} from '@/api/services/path';
import { Wish } from '@/types/wishType';

import {
  WishListRequestParams,
  WishListResponse,
  WishListResponseRaw,
} from './types';

export type WishRequestBody = {
  productId: string;
};
export type WishResponse = Wish;

export const addWish = async ({ productId }: WishRequestBody) => {
  const response = await AUTHROIZATION_API.post<WishResponse>(
    getWishAddPath(),
    {
      productId,
    }
  );

  return response.data;
};

export const fetchWishList = async (
  params: WishListRequestParams
): Promise<WishListResponse> => {
  const response = await AUTHROIZATION_API.get<WishListResponseRaw>(
    getWishListPath(params)
  );

  const { data } = response;

  return {
    wishList: data.content,
    nextPageToken:
      data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

export type DeleteWishRequestParams = {
  wishId: number;
};
export type DeleteWishResponse = string;

export const deleteWishItem = async (params: DeleteWishRequestParams) => {
  await AUTHROIZATION_API.delete<DeleteWishResponse>(
    getWishDeletePath(params.wishId)
  );
};
