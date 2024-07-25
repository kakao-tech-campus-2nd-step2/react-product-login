const BASE_URL = 'http://localhost:3000';
export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;
