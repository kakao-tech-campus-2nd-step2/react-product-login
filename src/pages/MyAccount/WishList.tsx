import styled from '@emotion/styled';

import { useGetWishList } from '@/api/hooks/useGetWishList';
import type { ProductData } from '@/types';

import { WishItem } from './WishItem';

export const WishList = () => {
  const { data } = useGetWishList();

  return (
    <Wrapper>
      {data?.map((wish: ProductData) => (
        <WishItem imageUrl={wish.imageUrl} name={wish.name} price={wish.price} />
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
