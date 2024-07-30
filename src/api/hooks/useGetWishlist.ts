import { useQuery } from "@tanstack/react-query";

import type { ProductData } from "@/types";

import { BASE_URL, fetchInstance } from "../instance";

interface RequestParams {
    userId?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export interface WishResponseData {
    id: number;
    product: Omit<ProductData, 'categoryId'>;
    createdDate: Date;
    userId: string;
}

export const postWishlistPath = () => `${BASE_URL}/api/wishes`;
export const deleteWishlistPath = (wishId: string) => `${BASE_URL}/api/wishes/${wishId}`;
export const getWishlistPath = ({userId, page, size, sort}: RequestParams) => {
    const params = new URLSearchParams();

    if(userId) params.append('userId', userId);
    if(page) params.append('page', page.toString());
    if(size) params.append('size', size.toString());
    if(sort) params.append('sort', sort);

    if(params.size === 0) return `${BASE_URL}/api/wishes`;

    return `${BASE_URL}/api/wishes?${params.toString()}`;
} 


const getWishlist = async (params: RequestParams) => {
    const response = await fetchInstance.get<WishResponseData[]>(getWishlistPath(params));
    return response.data;
}
export const useGetWishlist = (params: RequestParams) => 
    useQuery({
        queryKey: ['wishlist', params],
        queryFn: () => getWishlist(params),
    }) 