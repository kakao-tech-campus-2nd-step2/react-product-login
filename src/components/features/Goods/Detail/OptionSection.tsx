import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useWish } from '@/hooks/useWish';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();

  const authInfo = useAuth();

  const { isWish, handleWishClick } = useWish();

  const handleOrderClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  return (
    <Wrapper>
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <ButtonBox>
          <Button theme="darkGray" width="60px" onClick={handleWishClick}>
            {isWish ? (
              <AiFillHeart style={{ color: 'rgb(241, 42, 36)', fontSize: '24px' }} />
            ) : (
              <AiOutlineHeart style={{ color: '#fff', fontSize: '24px' }} />
            )}
          </Button>
          <Button theme="black" size="large" onClick={handleOrderClick}>
            나에게 선물하기
          </Button>
        </ButtonBox>
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

const ButtonBox = styled.div`
  display: table;
  width: 100%;
  table-layout: fixed;
  gap: 2px;
`;
