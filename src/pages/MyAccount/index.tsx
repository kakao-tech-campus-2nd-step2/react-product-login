import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const fetchWishes = useCallback(
    async (page: number) => {
      if (!authInfo) return; // authInfo가 없으면 반환
      try {
        const response = await axios.get(`/api/wishes?page=${page}&size=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${authInfo.token}`, // 로그인 토큰 추가
          },
        });
        console.log(response.data);
        setWishes(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch wishes', error);
      }
    },
    [authInfo, pageSize],
  );

  const deleteWish = async (wishId: number) => {
    if (!authInfo) return; // authInfo가 없으면 반환
    try {
      await axios.delete(`/api/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`, // 로그인 토큰 추가
        },
      });
      // 삭제 후 wishes 업데이트
      setWishes(wishes.filter((wish) => wish.id !== wishId));
    } catch (error) {
      console.error('Failed to delete wish', error);
    }
  };

  useEffect(() => {
    fetchWishes(currentPage);
  }, [fetchWishes, currentPage]);

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
      <Spacing height={64} />
      <h2>관심 목록</h2>
      <WishList>
        {wishes.map((wish) => (
          <WishListItem key={wish.id}>
            <img src={wish.product.imageUrl} alt={wish.product.name} />
            <div>
              <h3>{wish.product.name}</h3>
              <p>{wish.product.price}원</p>
              <button onClick={() => deleteWish(wish.id)}>삭제</button>
            </div>
          </WishListItem>
        ))}
      </WishList>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            onClick={() => setCurrentPage(index)}
            active={index === currentPage}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
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

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  flex-wrap: wrap;
`;

const WishListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 40%;

  img {
    width: 150px;
    height: 150px;
    margin-right: 10px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #888;
    font-size: 20px;
  }

  button {
    width: 50px;
    height: 30px;
    font-size: 18px;
    background-color: rgb(255, 200, 200);
    border-radius: 10px;
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
`;

const PageButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  background-color: ${({ active }) => (active ? '#333' : '#f5f5f5')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;
