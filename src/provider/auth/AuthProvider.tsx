import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LoginResponse } from '@/api/services/auth/login';

import { AuthContext, AuthInfo } from './AuthContext';

type CurrentToken = LoginResponse | undefined;
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    const currentTokenString = sessionStorage.getItem('authInfo');
    const currentToken: CurrentToken = currentTokenString
      ? JSON.parse(currentTokenString)
      : undefined;

    if (currentToken) {
      setAuthInfo({
        email: currentToken.email,
        name: getUsernameFromEmail(currentToken.email),
        token: currentToken.token,
      });
      return;
    }

    setAuthInfo(undefined);
  }, [location]);

  const isLoggedIn = !!authInfo?.token || false;

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      authInfo,
    }),
    [isLoggedIn, authInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function getUsernameFromEmail(email: string) {
  const index = email.indexOf('@');

  return email.slice(0, index);
}
