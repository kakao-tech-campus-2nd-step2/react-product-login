import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';
import { useState, useEffect } from 'react';

type WishlistItem = {
  id: number;
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
};

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = sessionStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <WishlistWrapper>
        <h2>관심 목록</h2>
        {wishlist.length === 0 ? (
          <p>관심 목록이 비어 있습니다.</p>
        ) : (
          <ul>
            {wishlist.map((item) => (
              <li key={item.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div>
                  <h4>{item.product.name}</h4>
                  <p>{item.product.price}원</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </WishlistWrapper>
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

const WishlistWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    div {
      h4 {
        margin: 0;
        font-size: 18px;
      }

      p {
        margin: 0;
        color: gray;
      }
    }
  }
`;
