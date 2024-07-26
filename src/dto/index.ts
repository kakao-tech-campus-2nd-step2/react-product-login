export interface LegacyProductData {
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

export interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}

export interface WishData {
  id: number;
  product: ProductData;
}

export interface LegacyProductDetailData extends LegacyProductData {
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

export interface CategoryData {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  description: string;
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
