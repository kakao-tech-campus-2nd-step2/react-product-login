import { ReactNode, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistoryOptions } from 'history';
import { LoadingSpinnerFullWidth } from '@components/atoms/LoadingSpinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginContextProvider from '@/providers/LoginContextProvider';

interface TestWrapperProps {
  children?: ReactNode;
}
interface RouterWrapperProps {
  historyOptions?: MemoryHistoryOptions;
}

export function RouterWrapper({ children, historyOptions }: TestWrapperProps & RouterWrapperProps) {
  const history = createMemoryHistory(historyOptions);

  return (
    <Router location={history.location} navigator={history}>
      {children}
    </Router>
  );
}

const queryClient = new QueryClient();

export function QueryClientWrapper({ children }: TestWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
}

export function SuspenseWrapper({ children }: TestWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinnerFullWidth />}>
      { children }
    </Suspense>
  );
}

export function ContextWrapper({ children }: TestWrapperProps) {
  return (
    <QueryClientWrapper>
      <LoginContextProvider>
        {children}
      </LoginContextProvider>
    </QueryClientWrapper>
  );
}
