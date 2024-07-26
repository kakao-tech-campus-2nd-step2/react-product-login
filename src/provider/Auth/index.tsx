import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  id: string;
  name: string;
  token: string;
};

type AuthContextData = {
  authInfo: AuthInfo | undefined;
  setAuthInfo: (authInfo: AuthInfo) => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const handleAuthInfo = (currentAuthInfo: AuthInfo) => {
    setAuthInfo(currentAuthInfo);
    authSessionStorage.set(currentAuthInfo.token);
  };

  useEffect(() => {
    if (currentAuthToken) {
      setAuthInfo({
        id: currentAuthToken, // TODO: 임시로 로그인 페이지에서 입력한 이름을 ID, token, name으로 사용
        name: currentAuthToken,
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthToken]);

  if (!isReady) return <></>;
  return (
    <AuthContext.Provider
      value={{
        authInfo,
        setAuthInfo: handleAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
