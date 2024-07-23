import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
