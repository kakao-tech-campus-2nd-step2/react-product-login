import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  id: string;
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentAuthToken = authSessionStorage.get();
    if (currentAuthToken) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthInfo({
          id: user.email,
          name: user.email,
          token: user.token,
        });
      }
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
