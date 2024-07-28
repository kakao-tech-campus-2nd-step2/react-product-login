const API_BASE = '/api/v1';

export const PRODUCTS_PATHS = {
  PRODUCTS_DETAIL: (productId?: string) => `${API_BASE}/products/${productId}/detail`,
  PRODUCTS_OPTIONS: (productId?: string) => `${API_BASE}/products/${productId}/options`,
};
