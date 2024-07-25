import axios from 'axios';

import type { ProductDetailResponseData } from './productDetail.mock';
import { getProductDetailPath } from './productDetailPath';
import { getProductDetail } from './useGetProductDetail';

// Mocking axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Sample product detail response
const mockProductDetailResponse: ProductDetailResponseData = {
    id: 1,
    name: 'string',
    price: 999,
    imageUrl: 'string',
    categoryId: 999
};

describe('getProductDetail', () => {
  it('should return product detail data', async () => {
    // Mocking axios.get to return the mock response
    mockedAxios.get.mockResolvedValueOnce({ data: mockProductDetailResponse });

    const productId = '1';
    const data = await getProductDetail({ productId });

    expect(axios.get).toHaveBeenCalledWith(getProductDetailPath(productId));
    expect(data).toEqual(mockProductDetailResponse);
  });
});
