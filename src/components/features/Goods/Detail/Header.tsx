import { Button, Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

type Props = ProductDetailRequestParams;

export const GoodsDetailHeader = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const [isRegistration, setIsRegistration] = useState(false);

  const handleRegistration = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/wishes',
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        setIsRegistration(true);
        alert('관심 등록 완료');
      }
    } catch (error) {
      console.error('관심 등록 실패:', error);
      alert('관심 등록에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <GoodsImage src={detail.imageUrl} alt={detail.name} />
      <InfoWrapper>
        <Title>{detail.name}</Title>
        <Price>{detail.price}원</Price>
        <Divider color="#f5f5f5" />
        <Notice>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Notice>
        <Divider color="#f5f5f5" />
        <Button width="362px" height="60px" mt="110px" onClick={handleRegistration} disabled={isRegistration}>
          {isRegistration ? '관심등록 상품' : '관심등록 하기'}
        </Button>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`;

const GoodsImage = styled.img`
  width: 100%;
  max-width: 450px;
`;

const InfoWrapper = styled.div`
  width: 100%;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-left: 24px;
  }
`;

const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: #111;
  font-weight: 400;
  word-break: break-all;
`;

const Price = styled.p`
  width: 100%;
  min-height: 120px;
  padding-top: 16px;
  font-size: 30px;
  font-weight: 400;
  line-height: 52px;
  color: #222;
`;

const Notice = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #111;
`;
