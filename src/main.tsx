import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@router';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from '@styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw/browser';
import LoginContextProvider from '@/providers/LoginContextProvider';

const queryClient = new QueryClient();
const testFlagEnabled = import.meta.env.VITE_RUNNING_ON_DEV;

function render() {
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
}

if (testFlagEnabled) {
  const handlers = await import('@/mock');
  const mockWorker = setupWorker(...handlers.default);
  mockWorker.start().then(render);
} else render();
