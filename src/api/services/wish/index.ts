import { AxiosError } from 'axios';

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
  productId: number;
};
export type WishResponse = Wish;
export const addWish = async ({ productId }: WishRequestBody) => {
  try {
    const response = await AUTHROIZATION_API.post<WishResponse>(
      getWishAddPath(),
      { productId }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const res = error.response;

      if (res?.status === 401) {
        throw new Error('로그인 후 시도해주세요.');
      }

      if (res?.status === 404) {
        throw new Error('해당 상품을 위시 리스트에 추가할 수 없습니다.');
      }

      if (res?.status === 400) {
        if (res.statusText === 'Duplicate Product') {
          throw new Error('이미 위시 리스트에 추가된 상품입니다.');
        }

        throw new Error('잘못된 요청 입니다. 다시 시도해주세요.');
      }
    }

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
      getWishDeletePath(params.wishId.toString())
    );
  } catch (error) {
    throw new Error('위시 상품을 삭제하는 데 실패했습니다.');
  }
};
