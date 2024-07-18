export type OrderProductDetail = {
  imageURL: string;
  brandName: string;
  productName: string;
};

export type OrderFormType = {
  productId: number;
  productQuantity: number;
  gitfMessage: string;
  isCashChecked: boolean;
  cashReceiptType: '개인소득공제' | '사업자증빙용';
  cashReceiptNumber: string;
};

export type OrderDetail = {
  productDetail: OrderProductDetail;
  finalPrice: number;
  productId: number;
  productQuantity: number;
};
