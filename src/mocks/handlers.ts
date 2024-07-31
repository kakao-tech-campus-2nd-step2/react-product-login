import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const handlers = [...categoriesMockHandler, ...productsMockHandler];
