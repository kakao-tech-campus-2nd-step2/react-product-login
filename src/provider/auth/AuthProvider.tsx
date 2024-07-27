import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { LoginResponse } from '@/api/services/auth/login';
import { authLocalStorage } from '@/utils/storage';

import { UpDownDots } from '@/components/Loading/UpDownDots';

import { AuthContext, AuthInfo } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authLocalStorage.get();
  const [isReady, setIsReady] = useState(false);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const updateAuthInfo = useCallback((authToken?: LoginResponse) => {
    if (!authToken) {
      setAuthInfo(undefined);
      return;
    }

    setAuthInfo({
      email: authToken.email,
      name: getUsernameFromEmail(authToken.email),
      token: authToken.token,
    });
  }, []);

  useEffect(() => {
    if (currentAuthToken && !authInfo) {
      updateAuthInfo(currentAuthToken);
    }
    setIsReady(true);
  }, [currentAuthToken, authInfo, updateAuthInfo]);

  const contextValue = useMemo(
    () => ({
      authInfo,
      updateAuthInfo,
    }),
    [authInfo, updateAuthInfo]
  );

  if (!isReady) return <UpDownDots />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function getUsernameFromEmail(email: string) {
  const index = email.indexOf('@');

  return email.slice(0, index);
}
