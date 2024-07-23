import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthProvider from '@context/auth/AuthProvider';
import FilterProvider from '@context/filter/FilterProvider';
import GlobalStyles from '@assets/styles';

function App() {
  return (
    <FilterProvider>
      <AuthProvider>
        <GlobalStyles />
        <Outlet />
      </AuthProvider>
    </FilterProvider>
  );
}

export default App;
