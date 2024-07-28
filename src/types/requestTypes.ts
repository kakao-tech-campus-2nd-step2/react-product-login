export interface RankingProductsRequest {
  targetType?: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType?: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
}

export interface DeleteWishRequest {
  wishId: number;
}

export interface GetWishesRequest {
  page: number;
  size: number;
  sort: string;
}

export interface AddWishRequest {
  productId: number;
}

export interface ThemeProductsRequest {
  themeKey: string | undefined;
  pageToken?: string;
  maxResults?: number;
}

export interface ProductDetailRequest {
  productId?: string;
}

export interface ProductOptionsRequest {
  productId?: string;
}

export interface MyAccountWishProductsRequest {
  pageToken?: string;
  maxResults?: number;
}

export interface PointUpdateRequest {
  point: number;
}

export interface ProductOrderRequest {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
}
