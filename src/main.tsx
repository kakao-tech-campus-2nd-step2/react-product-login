import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@router';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from '@styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import LoginContextProvider from '@/providers/LoginContextProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
          <RouterProvider router={router} />
        </LoginContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
