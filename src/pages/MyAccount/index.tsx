import styled from '@emotion/styled';

import type { WishlistResponseData } from '@/api/hooks/useWishlist';
import { useDeleteWishlist, useFetchWishlist} from '@/api/hooks/useWishlist';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data: wishlist, isLoading } = useFetchWishlist();
  const deleteWishlistMutation = useDeleteWishlist();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDelete = (wishId: number) => {
    deleteWishlistMutation.mutate(wishId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! 
      <Spacing height={64} />

      <Spacing height={64} />

      <WishlistContainer>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item: WishlistResponseData) => (
            <WishlistItem key={item.id}>
              <p>Product ID: {item.productId}</p>
              <Button size="small" theme="darkGray" onClick={() => handleDelete(item.id)}>
                삭제
              </Button>
            </WishlistItem>
          ))
        ) : (
          <p>위시리스트가 비어 있습니다.</p>
        )}
      </WishlistContainer>

      <Spacing height={64} />

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

const WishlistContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WishlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
