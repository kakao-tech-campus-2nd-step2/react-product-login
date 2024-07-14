import type { GoodsData, ThemeData } from '.';

export const ThemeMockData: ThemeData = {
  id: 1,
  key: 'life_small_gift',
  label: '가벼운 선물',
  title: '예산은 가볍게, 감동은 무겁게❤️',
  description: '당신의 센스를 뽐내줄 부담 없는 선물',
  backgroundColor: '#4b4d50',
  imageURL:
    'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240131153049_5a22b137a8d346e9beb020a7a7f4254a.jpg',
};

export const ThemeMockList = [ThemeMockData];

export const GoodsMockData: GoodsData = {
  id: 123,
  name: 'BBQ 양념치킨+크림치즈볼+콜라1.25L',
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  wish: {
    wishCount: 201,
    isWished: false,
  },
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: 'BBQ',
    imageURL:
      'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
  },
};

export const GoodsMockList: GoodsData[] = Array.from({ length: 21 }, () => GoodsMockData);
