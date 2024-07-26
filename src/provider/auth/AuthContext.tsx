import { createContext } from 'react';

export type AuthInfo = {
  email: string;
  name: string; // 임시로 email 파싱해서 사용
  token: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  authInfo?: AuthInfo;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
