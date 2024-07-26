import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

const WISHLIST_KEY = 'wishlist';

type Props = {
  productId: string;
};

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const [isFavorite, setIsFavorite] = useState(false);

  const totalPrice = useMemo(() => detail.price * Number(countAsString), [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    setIsFavorite(storedWishlist.includes(parseInt(productId)));
  }, [productId]);

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => {
      const newState = !prev;
      const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      let updatedWishlist;

      if (newState) {
        updatedWishlist = [...storedWishlist, parseInt(productId)];
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
        alert('위시 등록 완료');
      } else {
        updatedWishlist = storedWishlist.filter((id: number) => id !== parseInt(productId));
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
      }

      return newState;
    });
  }, [productId]);

  return (
    <Wrapper>
      <CountOptionItem name={options[0]?.name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice.toLocaleString()}원</span>
        </PricingWrapper>
        <ButtonWrapper>
          <HeartButton onClick={toggleFavorite} isFavorite={isFavorite}>
            {isFavorite ? '❤️' : '🤍'}
          </HeartButton>
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
  align-items: center;
`;

const HeartButton = styled.button<{ isFavorite: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? 'red' : 'grey')};
  margin-right: 10px;
`;