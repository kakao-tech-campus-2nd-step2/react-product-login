const BASE_URL = 'http://localhost:3000';
export const getProductDetailPath = (productId: string) => `${BASE_URL}/products/${productId}`;
