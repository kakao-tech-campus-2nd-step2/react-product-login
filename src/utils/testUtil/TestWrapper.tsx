import { ReactNode } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistoryOptions } from 'history';
import CategoryContextProvider from '@/providers/CategoryContextProvider';

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

export function CategoryContextWrapper({ children }: TestWrapperProps) {
  return (
    <CategoryContextProvider>
      {children}
    </CategoryContextProvider>
  );
}
