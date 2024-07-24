import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Spinner } from '@/assets/Spinner.svg';

export type LoadingProps = {
  isLoading: boolean;
  error: boolean;
  errorRedirect?: string;
  children: React.ReactNode;
};

function Loading({ isLoading, children, error, errorRedirect }: LoadingProps) {
  const navigate = useNavigate();

  if (error && errorRedirect) {
    navigate(errorRedirect);
    return null;
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '250px',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          color: '#a0a0a0',
        }}
      >
        알 수 없는 오류가 발생했습니다.
      </div>
    );
  } else if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner role="spinner" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default Loading;
