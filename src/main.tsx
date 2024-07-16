import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@router';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from '@styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginContextProvider from '@/providers/LoginContextProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <LoginContextProvider>
        <RouterProvider router={router} />
      </LoginContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
