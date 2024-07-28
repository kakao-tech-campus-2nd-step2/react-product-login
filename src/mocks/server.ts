import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { interestHandlers } from '@/api/hooks/interest.mock';
import { loginMockHandler } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { signupHandler } from '@/api/hooks/signup.mock';

export const server = setupServer(...categoriesMockHandler, ...interestHandlers, ...loginMockHandler, ...productsMockHandler, ...signupHandler);