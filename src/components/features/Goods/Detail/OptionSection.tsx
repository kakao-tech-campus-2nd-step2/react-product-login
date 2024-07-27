import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAddToWishlist, useWishlist } from '@/api/hooks/useWishlist';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = { productId: string };

export const OptionSection = ({ productId }: Props) => {
  const numericProductId = Number(productId);
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });
  const [countAsString, setCountAsString] = useState('1');

  const totalPrice = detail?.price * Number(countAsString);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const { fetchWishlist } = useWishlist();
  const { addToWishlist, loading: adding } = useAddToWishlist(fetchWishlist);

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({ id: numericProductId, count: parseInt(countAsString) });
    navigate(RouterPath.order);
  };

  const handleLike = async () => {
    try {
      await addToWishlist(numericProductId);
      alert('관심 상품에 등록되었습니다.');
    } catch (error) {
      console.error('관심 상품 등록 실패', error);
      alert('관심 상품 등록에 실패하였습니다.');
    }
  };

  return (
    <Wrapper>
      <CountOptionItem name={options?.[0]?.name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <ButtonWrapper>
          <Button theme='black' size='large' onClick={handleLike} disabled={adding}>
            ♡
          </Button>
          <Button theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </ButtonWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;
  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
