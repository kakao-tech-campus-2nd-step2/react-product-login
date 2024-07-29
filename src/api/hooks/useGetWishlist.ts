import type { ProductData } from "@/types";

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

export const postWishlistPath = () => `/api/wishes`;
export const deleteWishlistPath = (wishId: string) => `/api/wishes/${wishId}`;
export const getWishlistPath = ({userId, page, size, sort}: RequestParams) => {
    const params = new URLSearchParams();

    if(userId) params.append('userId', userId);
    if(page) params.append('page', page.toString());
    if(size) params.append('size', size.toString());
    if(sort) params.append('sort', sort);

    return `/api/wishes?${params.toString()}`;
} 