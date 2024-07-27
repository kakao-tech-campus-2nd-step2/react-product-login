import { Box, Divider, Heading, VStack } from '@chakra-ui/react';

import WishlistItem from './WishlistItem';

const wishlistItems = [
  {
    id: 3245119,
    name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: 145000,
  },
  {
    id: 2263833,
    name: '외식 통합권 10만원권',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
    price: 100000,
  },
  {
    id: 6502823,
    name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
    price: 108000,
  },
  {
    id: 1181831,
    name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
    price: 122000,
  },
  {
    id: 1379982,
    name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
    price: 133000,
  },
];

export const Wishlist = () => {
  return (
    <Box p={8}>
      <Heading mb={6}>위시리스트</Heading>
      <Divider mb={6} />
      <VStack spacing={4} align="stretch">
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.name}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Wishlist;
