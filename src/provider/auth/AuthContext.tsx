import { createContext } from 'react';

import { LoginResponse } from '@/api/services/auth/login';

export type AuthInfo = {
  email: string;
  name: string; // 임시로 email 파싱해서 사용
  token: string;
};

export type AuthContextType = {
  authInfo?: AuthInfo;
  updateAuthInfo: (authToken?: LoginResponse) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
