import { ReactNode, useEffect, useMemo, useState } from 'react';

import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('');
  const isLoggedIn = !!sessionStorage.getItem('token');

  useEffect(() => {
    console.log(email);
  }, [email]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      email,
      setEmail,
    }),
    [isLoggedIn, email, setEmail]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
