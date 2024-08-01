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
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthToken) {
      // 여기에서 실제 API 호출을 통해 사용자 정보를 가져올 수 있습니다.
      // 예: fetchUserInfo(currentAuthToken).then(user => setAuthInfo({ ...user, token: currentAuthToken }));
      setAuthInfo({
        id: 'user_id', // API를 통해 받아온 사용자 ID로 대체
        name: 'user_name', // API를 통해 받아온 사용자 이름으로 대체
        token: currentAuthToken,
      });
    }
    setIsReady(true);
  }, [currentAuthToken]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
