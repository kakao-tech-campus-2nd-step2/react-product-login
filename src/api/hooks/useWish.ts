import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { BASE_URL, fetchInstance } from "../instance";

export type WishParams = {
  productId: number;
};

export type AddWishResponseData = {
  id: number;
  productId: number;
};

export type WishContentData = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export type WishPageableData = {
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

export type WishListResponseData = {
  content: Array<WishContentData>;
  pageable: WishPageableData;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

const getWishPath = `${BASE_URL}/api/wishes`;

const addWish = async (params: WishParams, token: string) => {
  const response = await fetchInstance.post<AddWishResponseData>(getWishPath, params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const useAddWish = (token: string) => {
  return useMutation<AddWishResponseData, AxiosError, WishParams>({
    mutationFn: (params: WishParams) => addWish(params, token),
  });
};

const deleteWish = async (params: WishParams, token: string) => {
  await fetchInstance.delete(`${getWishPath}/${params.productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteWish = (token: string) => {
  return useMutation<void, AxiosError, WishParams>({
    mutationFn: (params: WishParams) => deleteWish(params, token),
  });
};

const getWishListPath = (page: number, size: number, sort: string) =>
  `${getWishPath}?page=${page}&size=${size}&sort=${sort}`;

const getWishList = async (
  page: number,
  size: number,
  sort: string,
  token: string,
): Promise<WishListResponseData> => {
  const response = await fetchInstance.get(getWishListPath(page, size, sort), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useGetWishList = (page: number, size: number, sort: string, token: string) => {
  return useQuery<WishListResponseData, AxiosError>({
    queryKey: ["wishList", page, size, sort],
    queryFn: () => getWishList(page, size, sort, token),
  });
};
