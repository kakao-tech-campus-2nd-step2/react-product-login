import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type WishlistItem = {
  id: string;
  product: {
    name: string;
  };
};

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  //위시리스트 조회
  const fetchWishlist = useCallback(async () => {
    if (!authInfo) return [];
    const token = authInfo.token;

    try {
      const response = await fetch('/api/wishes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      const data = await response.json();
      console.log(data);
      return data.content;
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  }, [authInfo]);

  //위시리스트 삭제
  const removeWish = useCallback(
    async (wishId: number) => {
      if (!authInfo) return;
      const token = authInfo.token;

      try {
        const response = await fetch(`/api/wishes/${wishId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to remove wish');
        }
      } catch (error) {
        console.error('Failed to remove wish:', error);
      }
    },
    [authInfo],
  );

  useEffect(() => {
    const loadWishlist = async () => {
      const wishlistData = await fetchWishlist();
      setWishlist(wishlistData);
    };

    loadWishlist();
  }, [fetchWishlist]);

  const handleRemoveWish = async (wishId: string) => {
    await removeWish(Number(wishId));
    setWishlist((prev) => prev.filter((item) => item.id !== wishId));
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
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
      <WishlistWrapper>
        {wishlist.map((wish) => (
          <WishItem key={wish.id}>
            <WishName>{wish.id}</WishName>
            <Button size="small" onClick={() => handleRemoveWish(wish.id)}>
              삭제
            </Button>
          </WishItem>
        ))}
      </WishlistWrapper>
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

const WishlistWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WishItem = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WishName = styled.span`
  font-size: 18px;
`;
