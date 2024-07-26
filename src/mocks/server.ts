import { setupServer } from 'msw/node';

import { handlers } from '@/mocks/handlers';

import { interestHandlers } from './interestHandlers';

export const server = setupServer(...handlers, ...interestHandlers);
