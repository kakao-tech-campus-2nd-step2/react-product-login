import { setupServer } from 'msw/node';

import { handlers } from '@/mocks/handlers';
import { interestHandlers } from '@/mocks/interestHandlers';

export const server = setupServer(...handlers, ...interestHandlers);
