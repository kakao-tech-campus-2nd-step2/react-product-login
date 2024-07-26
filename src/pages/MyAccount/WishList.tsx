import styled from '@emotion/styled';

import { useGetWishList } from '@/api/hooks/useGetWishList';
import { LoadingView } from '@/components/common/View/LoadingView';
import type { ProductData } from '@/types';

import { WishItem } from './WishItem';

export const WishList = () => {
  const { data, isLoading, isError } = useGetWishList();

  if (isLoading) {
    return <LoadingView />;
  }
  if (isError) {
    return <div>에러 입니다.</div>;
  }

  return (
    <Wrapper>
      {data?.map((wish: ProductData) => (
        <WishItem
          key={wish.id}
          wishId={wish.id}
          imageUrl={wish.imageUrl}
          name={wish.name}
          price={wish.price}
        />
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
