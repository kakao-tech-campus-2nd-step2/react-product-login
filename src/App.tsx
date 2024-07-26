import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const initializeMocks = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    worker.start().then(() => {
      console.log('Mock Service Worker is running');
    });
  }
};

initializeMocks();

const App = () => {
  return (
    // ChakraProvider wraps the app to provide Chakra UI components and theme
    <ChakraProvider>
      {/* QueryClientProvider provides React Query context for managing server state */}
      <QueryClientProvider client={queryClient}>
        {/* AuthProvider provides authentication context to the app */}
        <AuthProvider>
          {/* Routes component handles the routing of the application */}
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
