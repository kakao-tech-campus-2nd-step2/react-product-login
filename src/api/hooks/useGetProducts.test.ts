import { getProducts } from './useGetProducts';

// Mocking the PRODUCTS_MOCK_DATA
jest.mock('./products.mock', () => ({
  PRODUCTS_MOCK_DATA: {
    content: [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ],
    last: false,
    number: 0,
    size: 20,
    totalElements: 40,
  },
}));

describe('getProducts', () => {
  it('should return products data', async () => {
    const data = await getProducts();

    expect(data).toEqual({
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
      nextPageToken: '1',
      pageInfo: {
        totalResults: 40,
        resultsPerPage: 20,
      },
    });
  });
});
