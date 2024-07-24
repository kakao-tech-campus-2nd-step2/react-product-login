import { CATEGORIES_RESPONSE_DATA } from '@/api/hooks/categories.mock';
import { getCategories } from '@/api/hooks/useGetCategorys';

import { worker } from '../../server';

describe('API 테스트', () => {
  beforeAll(() => worker.listen());
  afterAll(() => worker.close());

  it('getCategories', async () => {
    const categories = await getCategories();
    expect(categories).toEqual(CATEGORIES_RESPONSE_DATA);
  });
});
