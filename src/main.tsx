import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import './styles/reset.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element가 존재하지 않습니다.');
}

async function deferRender() {
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
});
