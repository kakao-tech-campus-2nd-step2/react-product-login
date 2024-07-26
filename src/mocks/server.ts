// src/mocks/server.js (for Node environment, e.g., Jest)
import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...categoriesMockHandler, ...productsMockHandler);
