import axios from "axios";

import { BASE_URL } from "../instance";

export interface User {
    id: string;
    password: string;
}

export const getUsersPath = () => `${BASE_URL}/api/users`;
export const getUserPath = (id: string) => `${BASE_URL}/api/users/${id}`;

export const getLogin = async (id: string, password: string) => {
    try{
        const response = await axios.post(getUserPath(id), {
            password,
        });
        if (Math.floor(response.status/100) === 2) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const getSignUp = async (id: string, password: string) => {
    try{
        const response = await axios.post(getUsersPath(), {
            id,
            password,
        });
        
        if (Math.floor(response.status/100) === 2) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}