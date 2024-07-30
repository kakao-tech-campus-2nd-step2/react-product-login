import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { type InterestItem } from '@/types';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const [interestList, setInterestList] = useState<InterestItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const fetchInterest = useCallback(
    async (page: number) => {
      if (!authInfo) return;
      
      try {
        const response = await axios.get(`/api/wishes?page=${page}&size=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
          },
        });
      
        setInterestList(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('관심 상품 Fetch 에 실패하였습니다.');
      }
    }, [authInfo, pageSize]
  );

  const deleteInterest = async (productId: number) => {
    if (!authInfo) return;

    try {
      await axios.delete(`/api/wishes/${productId}`, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`,
        },
      });
      // 삭제 후 상태 업데이트
      setInterestList((prevList) => prevList.filter((interest) => interest.productId !== productId));
    } catch (error) {
      console.error('관심 상품 삭제에 실패하였습니다.');
    }
  };

  useEffect(() => {
    fetchInterest(currentPage);
  }, [fetchInterest, currentPage]);

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
      <Title>관심 목록</Title>
      <WishList>
        {interestList.map((interest) => (
          <WishListCard key={interest.productId}>
            <ProductImage src={interest.product.imageUrl} alt={interest.product.name} />
            <CardContent>
              <ProductName>{interest.product.name}</ProductName>
              <ProductPrice>{interest.product.price.toLocaleString()}원</ProductPrice>
              <DeleteButton onClick={() => deleteInterest(interest.productId)}>
                관심상품 삭제
              </DeleteButton>
            </CardContent>
          </WishListCard>
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

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const WishList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

const WishListCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 200px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
  text-align: center;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ProductPrice = styled.p`
  margin: 5px 0 0;
  color: #888;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #f44336;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
`;

const PageButton = styled.button<{ active?: boolean }>`
  margin: 0 3px;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#555' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;
