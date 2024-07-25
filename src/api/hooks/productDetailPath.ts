// 카테고리별 제품 상세 정보 API 경로
export const getProductDetailPath = (productId: string | number) => {
      return `http://localhost:3000/api/products/${productId}`;
    };
    