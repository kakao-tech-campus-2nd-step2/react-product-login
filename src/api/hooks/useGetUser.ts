import axios from "axios";

import { BASE_URL } from "../instance";

export const getUsersPath = () => `${BASE_URL}/api/users`;
export const getUserPath = (id: string) => `${BASE_URL}/api/users/${id}`;

export const useLogin = async (id: string, password: string) => {
    const response = await axios.post(getUsersPath(), {
        id,
        password,
    });
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export const useSignUp = async (id: string, password: string) => {
    const response = await axios.post(getUsersPath(), {
        id,
        password,
    });
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}