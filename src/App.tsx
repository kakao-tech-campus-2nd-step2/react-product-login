import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/config/queryClient';
import { Router } from './routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
