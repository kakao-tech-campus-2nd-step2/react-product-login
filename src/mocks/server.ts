import { setupServer } from 'msw/node';

import { handlers } from '@/mocks/handlers';
import { interestHandlers } from '@/mocks/interestHandlers';

const allHandlers = [...handlers, ...interestHandlers];

export const server = setupServer(...allHandlers);
