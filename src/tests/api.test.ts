import { CATEGORIES_RESPONSE_DATA } from '@/api/hooks/categories.mock';
import { PRODUCTS_MOCK_DATA, PRODUCTS_MOCK_OPTIONS } from '@/api/hooks/products.mock';
import { getCategories } from '@/api/hooks/useGetCategorys';
import { getProductDetailPath } from '@/api/hooks/useGetProductDetail';
import { getProductOptionsPath } from '@/api/hooks/useGetProductOptions';
import { getProducts } from '@/api/hooks/useGetProducts';

import { worker } from '../../server';

describe('API 테스트', () => {
  beforeAll(() => worker.listen());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.close());

  it('getCategories', async () => {
    const categories = await getCategories();

    expect(categories).toEqual(CATEGORIES_RESPONSE_DATA);
  });

  it('getProducts', async () => {
    const params = { categoryId: '2920', pageToken: '1', maxResults: 10 };
    const products = await getProducts(params);

    expect(products.products).toEqual(PRODUCTS_MOCK_DATA.content);

    expect(products.nextPageToken).toBeUndefined();

    expect(products.pageInfo).toEqual({
      totalResults: PRODUCTS_MOCK_DATA.totalElements,
      resultsPerPage: PRODUCTS_MOCK_DATA.size,
    });
  });

  it('getProductDetail', async () => {
    const productId = PRODUCTS_MOCK_DATA.content[0].id;
    const response = await fetch(getProductDetailPath(productId.toString()));
    const productDetails = await response.json();

    expect(response.ok).toBe(true);

    expect(productDetails).toEqual(PRODUCTS_MOCK_DATA.content[0]);
  });

  it('getProductOptions', async () => {
    const productId = PRODUCTS_MOCK_DATA.content[0].id;
    const response = await fetch(getProductOptionsPath(productId.toString()));
    const options = await response.json();

    expect(response.ok).toBe(true);

    expect(options).toEqual(PRODUCTS_MOCK_OPTIONS);
  });
});
