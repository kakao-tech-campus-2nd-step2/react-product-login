import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// import { useFetchWishlist, useRemoveFromWishlist } from '@/api/hooks';
import { useFetchWishlist, useRemoveFromWishlist } from '@/api/hooks/useGetWishList';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';


export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { fetchWishlist, loading: fetchLoading, error: fetchError, wishlist } = useFetchWishlist();
  const { removeFromWishlist, loading: removeLoading, error: removeError } = useRemoveFromWishlist();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('createdDate,desc');

  useEffect(() => {
    if (authInfo) {
      fetchWishlist(authInfo.token, page, size, sort);
    }
  }, [authInfo, page, size, sort, fetchWishlist]);

  const handleRemove = async (wishId: number) => {
    const success = await removeFromWishlist(wishId, authInfo?.token || '');
    if (success) {
      alert('상품이 위시리스트에서 삭제되었습니다.');
      if (authInfo) {
        fetchWishlist(authInfo.token, page, size, sort);
      }
    } else if (removeError) {
      alert(`상품 삭제에 실패했습니다: ${removeError}`);
    }
  };

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  if (fetchLoading) return <p>Loading wishlist...</p>;
  if (fetchError) return <p>Error loading wishlist: {fetchError}</p>;

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <WishListWrapper>
        {wishlist?.content.length ? (
          wishlist.content.map(wish => (
            <WishItem key={wish.id}>
              <ProductName>{wish.product.name}</ProductName>
              <Button
                onClick={() => handleRemove(wish.id)}
                disabled={removeLoading}
              >
                삭제
              </Button>
            </WishItem>
          ))
        ) : (
          <p>위시리스트가 비어 있습니다.</p>
        )}
      </WishListWrapper>
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;

const WishListWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const WishItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  justify-content: space-between;
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: 500;
`;