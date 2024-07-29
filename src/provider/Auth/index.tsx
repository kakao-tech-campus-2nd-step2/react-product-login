import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

import type { LoginResponseData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

type AuthContextType = {
  authInfo: LoginResponseData | undefined;
  handleAuthInfo: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<LoginResponseData | undefined>(undefined);

  const handleAuthInfo = () => {
    const updatedAuthInfo = authSessionStorage.get();
    if (updatedAuthInfo) {
      setAuthInfo(updatedAuthInfo);
    }
  };

  useEffect(() => {
    handleAuthInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, handleAuthInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
