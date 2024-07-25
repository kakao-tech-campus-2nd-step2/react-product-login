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
  login: (token: string, id: string, name: string) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(false); // 초기값을 false로 설정

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const handleAuthInfo = (currentAuthInfo: AuthInfo) => {
    setAuthInfo(currentAuthInfo);
    authSessionStorage.set(currentAuthInfo.token);
  };

  const login = (token: string, id: string, name: string) => {
    handleAuthInfo({ id, name, token });
  };

  const logout = () => {
    authSessionStorage.set(undefined);
    setAuthInfo(undefined); // 상태 초기화
  };

  useEffect(() => {
    if (currentAuthToken) {
      // 임의의 API 호출 또는 로컬 스토리지에서 사용자 정보 가져오기
      const fetchUserInfo = async () => {
        try {
          // 여기서 실제 사용자 정보를 가져오는 로직을 추가
          const userInfo = {
            id: currentAuthToken,
            name: currentAuthToken,
            token: currentAuthToken,
          };
          setAuthInfo(userInfo);
        } catch (error) {
          console.error('사용자 정보를 가져오는데 실패했습니다.', error);
        }
      };
      fetchUserInfo();
    }
    setIsReady(true); // 준비 상태를 완료로 설정
  }, [currentAuthToken]);

  if (!isReady) return <></>;
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo: handleAuthInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
