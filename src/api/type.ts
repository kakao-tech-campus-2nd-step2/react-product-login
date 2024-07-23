// Ajax Types
export type AjaxResult<T> = {
  success: boolean;
  data: T | null;
};

// Data Types
export type ProductData = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export type ProductDetailData = ProductData & {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    images: string[];
  };
  productDetailInfo: {
    announcements: {
      displayOrder: number;
      name: string;
      value: string;
    }[];
    terms: {
      displayOrder: number;
      title: string;
      description: string;
    }[];
  };
};

export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
};

export type MessageCardTemplateData = {
  id?: number;
  defaultTextMessage?: string;
  thumbURL?: string;
  imageURL?: string;
};

export type MyAccountInfoData = {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
};

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type ProductsOptionData = {
  key: string;
  value: string;
  level: number;
  options: [];
  id: number;
  usable: boolean;
  price: number;
  stockQuantity: number;
  unlimitedStockQuantity: boolean;
};

// RequestBody Types
export type ProductOrderRequestBody = {
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
};

export type GetRankingProductsRequestBody = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GetThemesProductsRequestBody = {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
};

// ResponseBody Types
export type GetRankingProductsResponseBody = {
  products: ProductData[];
};

export type GetThemesResponseBody = {
  themes: ThemeData[];
};

export type GetThemesProductsResponseBody = {
  products: ProductData[];
  nextPageToken: string;
  pageInfo: PageInfo;
};

export type GetProductsDetailResponseBody = {
  detail: ProductDetailData;
};

export type GetProductsOptionResponseBody = {
  options: {
    productId: number;
    productName: string;
    productPrice: number;
    hasOption: boolean;
    giftOrderLimit: number;
    names: string[];
    options: ProductsOptionData[];
  };
};
