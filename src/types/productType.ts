type Wish = {
  wishCount: number;
  isWished: boolean;
};

type Price = {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
};

type BrandInfo = {
  id: number;
  name: string;
  imageURL: string;
};

export type ProductData = {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
};

export type RankingFilter = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

type ReviewData = {
  averageRating: number;
  totalReviewCount: number;
};

type ProductDescriptionData = {
  displayImage: string[];
};

type AnnouncementData = {
  name: string;
  value: string;
  displayOrder: number;
};

type TermData = {
  displayCode: number;
  title: string;
  description: string;
};

type ProductDetailInfoData = {
  announcements: AnnouncementData[];
  terms: TermData[];
};

export interface ProductDetailData extends ProductData {
  isAccessableProductPage: boolean;
  review: ReviewData;
  productDescription: ProductDescriptionData;
  productDetailInfo: ProductDetailInfoData;
}

type OptionItem = {
  key: string;
  value: string;
  level: number;
  options: OptionItem[];
  id: number;
  usable: boolean;
  price: number;
};

export type ProductOptions = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: OptionItem[];
};
