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
  try {
    const response = await AUTHROIZATION_API.post<WishResponse>(
      getWishAddPath(),
      {
        productId,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트에 추가하는 데 실패했습니다.');
  }
};

export const fetchWishList = async (
  params: WishListRequestParams
): Promise<WishListResponse> => {
  try {
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
  } catch (error) {
    throw new Error('위시 상품 목록을 불러오는 데 실패했습니다.');
  }
};

export type DeleteWishRequestParams = {
  wishId: number;
};
export type DeleteWishResponse = string;

export const deleteWishItem = async (params: DeleteWishRequestParams) => {
  try {
    await AUTHROIZATION_API.delete<DeleteWishResponse>(
      getWishDeletePath(params.wishId)
    );
  } catch (error) {
    throw new Error('위시 상품을 삭제하는 데 실패했습니다.');
  }
};
