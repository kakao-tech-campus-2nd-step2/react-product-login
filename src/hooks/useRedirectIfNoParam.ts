import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function useRedirectIfNoParam(paramKey: string, redirectPath: string) {
  const params = useParams<{ [key: string]: string }>();
  const navigate = useNavigate();
  const paramValue = params[paramKey];

  useEffect(() => {
    if (!paramValue) navigate(redirectPath);
  }, [paramValue, navigate, redirectPath]);

  return paramValue;
}
