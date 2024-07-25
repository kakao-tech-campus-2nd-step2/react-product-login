// 카테고리별 제품 옵션 API 경로
export const getProductOptionsPath = (productId: string | number) => {
    return `http://localhost:3000/api/products/${productId}/options`;
  };
  