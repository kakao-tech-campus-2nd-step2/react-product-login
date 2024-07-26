import axios from 'axios';
import { useState } from 'react';

type RegisterRequestBody = {
    email: string;
    password: string;
};

type RegisterResponseBody = {
    email: string;
    token: string;
};

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: RegisterRequestBody): Promise<RegisterResponseBody | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<RegisterResponseBody>('/api/members/login', data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'login failed');
            } else {
                setError('An unexpected error occurred');
            }
            return null;
        }
    };

    return { login, loading, error };
};