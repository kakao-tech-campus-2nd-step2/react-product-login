import axios from 'axios';

const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const VERCEL_API_URL = 'https://react-gift-mock-api-jasper200207.vercel.app';

const vercelApi = axios.create({
  baseURL: VERCEL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { externalApi, VERCEL_API_URL, vercelApi };
