import styled from '@emotion/styled';
import { useEffect,useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type WishlistItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishList, setWishList] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await fetch('/api/wishes');
        const wishData = await response.json();
        setWishList(wishData.content);
      } catch (error) {
        console.error('관심 목록 불러오기 실패', error);
      }
    };

    fetchWishList();
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleRemoveInterest = async (id: number) => {
    try {
      await fetch(`/api/wishes/${id}`, {
        method: 'DELETE',
      });
      setWishList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('관심 삭제 실패', error);
    }
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
      <Spacing height={32} />
      <InterestList>
        <h2>관심 목록</h2>
        {wishList.length === 0 ? (
          <p>관심 목록이 비어 있습니다.</p>
        ) : (
          wishList.map((item) => (
            <InterestItem key={item.id}>
              <span>{item.product.name}</span>
              <Button size="small" onClick={() => handleRemoveInterest(item.id)}>
                관심 삭제
              </Button>
            </InterestItem>
          ))
        )}
      </InterestList>
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

const InterestList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const InterestItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  span {
    font-size: 18px;
  }
`;
