import axios from 'axios';

const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const vercelApi = axios.create({
  baseURL: 'https://react-gift-mock-api-jasper200207.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { externalApi, vercelApi };
