import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

type RequestPath = { [key: string]: string };

export function replacePathParams(url: string, pathParams: RequestPath): string {
  let replacedUrl = url;
  Object.entries(pathParams).forEach(([key, value]) => {
    replacedUrl = replacedUrl.replace(`:${key}`, value.toString());
  });

  return replacedUrl;
}
