import styled from '@emotion/styled';

import { useGetWishlist } from '@/api/hooks/useGetWishlist';
import { Container } from '@/components/common/layouts/Container';
import { LoadingView } from '@/components/common/View/LoadingView';
import { useAuth } from '@/provider/Auth';
import { breakpoints } from '@/styles/variants';

import WishCard from './WishCard';

// TODO: 페이징 기능 구현

export default () => {
  const authInfo = useAuth();
  const { data, isError, isLoading } = authInfo
    ? useGetWishlist({
        userId: authInfo.id,
      })
    : { data: undefined, isError: false, isLoading: true };

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.length <= 0) return <TextView>위시리스트가 없어요.</TextView>;

  return (
    <Wrapper>
      <Container>
        {data.map(({ id, product }) => (
          <WishCard
            key={id}
            id={id}
            imageURL={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
