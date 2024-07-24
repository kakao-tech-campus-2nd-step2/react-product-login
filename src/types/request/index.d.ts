import { CashReceiptType, RankFilter, TargetFilter } from '@/types';

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
