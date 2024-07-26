import { Dispatch, SetStateAction, createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
