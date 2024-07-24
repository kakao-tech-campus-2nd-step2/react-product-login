import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { RENDER_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ROUTER_PATH } from '@/routes/path';

type ErrorFallbackProps = {
  error: AxiosError;
};

export const ThemeErrorFallback = ({ error }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error.message === RENDER_ERROR_MESSAGES.THEME_NOT_FOUND) {
      navigate(ROUTER_PATH.HOME);
    }
  }, [error, navigate]);

  return <div>{error.message}</div>;
};
