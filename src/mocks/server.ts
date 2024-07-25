// Dom 브라우저 에러 회피하기 위하여 사용
import { setupServer } from 'msw/node';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const worker = setupServer(...categoriesMockHandler, ...productsMockHandler);
