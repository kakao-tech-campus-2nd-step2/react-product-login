import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  if (process.env.REACT_APP_RUN_MSW === 'true') {
    const { browserWorker } = await import('@/mocks/browser');
    await browserWorker.start();
  }

  return;
}
deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
