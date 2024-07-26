import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistItem {
  id: number;
  product: Product;
}

interface WishlistResponse {
  content: WishlistItem[];
}

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishes');
        const data: WishlistResponse = await response.json();
        setWishlist(data.content);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDelete = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <Wrapper>
      {authInfo?.id}님 안녕하세요! <Spacing height={64} />
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
      <Spacing height={64} />
      <WishlistContainer>
        <h2>관심 목록</h2>
        {wishlist.length > 0 ? (
          <ul>
            {wishlist.map((item) => (
              <li key={item.id}>
                <InterestProduct>
                  <img src={item.product.imageUrl} alt={item.product.name} width={70} />
                  <div>
                    <p>이름: {item.product.name}</p>
                    <p>가격 : {item.product.price}원</p>
                  </div>
                  <Button
                    size="small"
                    theme="darkGray"
                    style={{
                      maxWidth: '100px',
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </Button>
                </InterestProduct>
              </li>
            ))}
          </ul>
        ) : (
          <p>관심 목록이 비어있습니다.</p>
        )}
      </WishlistContainer>
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
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;
const InterestProduct = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  gap: 4px;
  div {
    text-align: left;
  }
`;
