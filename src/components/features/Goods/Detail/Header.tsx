import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useAddToWishList } from '@/api/hooks/useAddToWishList';
import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

type Props = ProductDetailRequestParams;

export const GoodsDetailHeader = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { mutate: postWishList } = useAddToWishList();

  const handleAddToWishList = () => {
    const token = authSessionStorage.get();
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    postWishList(
      { token, productId: Number(productId) },
      {
        onSuccess: (data) => {
          alert('위시 리스트에 추가되었습니다.');
          console.log('위시 리스트 추가 성공:', data);
        },
        onError: (error: Error) => {
          alert('위시 리스트 추가에 실패했습니다.');
          console.error('위시 리스트 추가 오류:', error);
        },
      },
    );
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
        <Button theme="outline" onClick={handleAddToWishList}>
          위시 리스트 추가
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
