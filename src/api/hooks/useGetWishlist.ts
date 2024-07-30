import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { ProductData } from "@/types";

import { BASE_URL, fetchInstance, queryClient } from "../instance";

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

export const addWishlist = async (productId: number, userId: string) => {
    try{
        const response = await axios.post(postWishlistPath(), {
            productId,
            userId,
        });
        if(Math.floor(response.status/100) === 2)
            return true;
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
}
export const deleteWishlist = async (wishId: string) => {
    try{
        const response = await axios.delete(deleteWishlistPath(wishId));
        if(Math.floor(response.status/100) === 2){
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
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