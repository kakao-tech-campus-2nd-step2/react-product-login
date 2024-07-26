import axios from 'axios';
import { useState } from 'react';

type AddToWishlistRequestBody = {
    productId: number;
};

type AddToWishlistResponseBody = {
    id: number;
    productId: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

type Wish = {
    id: number;
    product: Product;
};

type PaginationResponse<T> = {
    content: T[];
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
};

export const useAddToWishlist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addToWishlist = async (data: AddToWishlistRequestBody, token: string): Promise<AddToWishlistResponseBody | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<AddToWishlistResponseBody>(
                '/api/wishes',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Failed to add to wishlist');
            } else {
                setError('An unexpected error occurred');
            }
            return null;
        }
    };

    return { addToWishlist, loading, error };
};

export const useRemoveFromWishlist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeFromWishlist = async (wishId: number, token: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`/api/wishes/${wishId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            return true;
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Failed to remove from wishlist');
            } else {
                setError('An unexpected error occurred');
            }
            return false;
        }
    };

    return { removeFromWishlist, loading, error };
};

export const useFetchWishlist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState<PaginationResponse<Wish> | null>(null);

    const fetchWishlist = async (token: string, page: number, size: number, sort: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<PaginationResponse<Wish>>('/api/wishes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page,
                    size,
                    sort,
                },
            });
            setWishlist(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Failed to fetch wishlist');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return { fetchWishlist, loading, error, wishlist };
};
