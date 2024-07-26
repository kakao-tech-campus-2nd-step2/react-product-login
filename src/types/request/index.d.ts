import { CashReceiptType } from '@/types';

export interface ProductDetailRequestPath {
  productId: string;
}

export interface ProductOptionsRequestPath extends ProductDetailRequestPath {}

export interface OrderRequestBody {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: CashReceiptType;
  cashReceiptNumber?: string;
}

export interface CategoryProductsRequestQuery {
  size: number;
  page: number;
  sort: string;
  categoryId: number;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AddWishesBody {
  productId: number;
}

export interface DeleteWishesPath {
  wishId: number;
}

export interface WishedProductsRequestQuery {
  size: number;
  page: number;
  sort: string;
}
