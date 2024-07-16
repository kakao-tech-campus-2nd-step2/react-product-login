export interface ProductData {
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
}

export interface ProductDetailData extends ProductData {
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
}

export interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  imageURL?: string;
}

export interface MessageCardTemplateData {
  id?: number;
  defaultTextMessage?: string;
  thumbURL?: string;
  imageURL?: string;
}

export interface MyAccountInfoData {
  id: number
}
