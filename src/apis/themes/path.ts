const API_BASE = '/api/v1';

export const THEME_PATHS = {
  THEMES: `${API_BASE}/themes`,
  THEME_PRODUCTS: (themeKey?: string) => `${API_BASE}/themes/${themeKey}/products`,
};
