import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type FavoriteItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};


export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
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
      <Spacing height={20} />
      <h2>나의 관심 상품</h2>
      {favorites.length === 0 ? (
        <p>관심 상품이 없습니다.</p>
      ) : (
        <FavoritesList>
          {favorites.map((item) => (
            <FavoriteItems key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.price}원</p>
              </div>
            </FavoriteItems>
          ))}
        </FavoritesList>
      )}
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

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FavoriteItems = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  div {
    padding: 10px;
    h3 {
      font-size: 16px;
      margin: 0 0 10px;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }
`;
