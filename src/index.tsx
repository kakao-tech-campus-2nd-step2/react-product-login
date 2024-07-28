import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { queryClient } from './apis/instance';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  if (process.env.REACT_APP_RUN_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </React.StrictMode>,
  );
});
