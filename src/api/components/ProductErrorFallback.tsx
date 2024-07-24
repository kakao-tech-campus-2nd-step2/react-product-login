import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ROUTER_PATH } from '@/routes/path';

type ErrorFallbackProps = {
  error: AxiosError;
};

export const ProductErrorFallback = ({ error }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.message === API_ERROR_MESSAGES.SERVER_ERROR) {
      navigate(ROUTER_PATH.HOME);
    }
  }, [error, navigate]);

  return <div>{error.message}</div>;
};
