export type CategoryData = {
  id: number;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[]; // 재귀적으로 동일한 구조를 가질 수 있음
  id?: number;
  price?: number;
  stockQuantity: number;
};

export type OrderHistory = {
  id: number;
  count: number;
};

export type OrderFormData = {
  productId: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};

export type UserData = {
  email: string;
  password: string;
};

export type UserResponseData = {
  email: string;
  token: string;
};

export type WishRequestData = {
  productId: number;
};

export type WishListData = {
  content: WishData[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type WishData = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};
