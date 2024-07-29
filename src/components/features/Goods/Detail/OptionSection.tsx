import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { WishList, WishListItem } from '@/types';
import { orderHistorySessionStorage, wishListSessionStorage } from '@/utils/storage';

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

  const redirectToLoginPageByAuth = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }
  };

  const isProductInWishList = (wishList: WishList) => {
    const productIdNumber = parseInt(productId, 10);
    return wishList.some((item: WishListItem) => item.product.id === productIdNumber);
  };

  const addProductToWishList = (wishList: WishList) => {
    const newWishListItem: WishListItem = {
      id: detail.id,
      product: {
        id: detail.id,
        name: detail.name,
        price: detail.price,
        imageUrl: detail.imageUrl,
      },
    };
    const updatedWishList = [...wishList, newWishListItem];
    wishListSessionStorage.set(updatedWishList);
    alert('관심 등록 완료');
  };

  const handleWishItem = () => {
    const currentWishList: WishList = wishListSessionStorage.get() || [];

    redirectToLoginPageByAuth();

    if (isProductInWishList(currentWishList)) {
      alert('이미 위시리스트에 등록된 상품입니다.');
    } else {
      addProductToWishList(currentWishList);
    }
  };

  const handleClick = () => {
    redirectToLoginPageByAuth();

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
        <ButtonWrapper>
          <Button theme="darkGray" size="responsive" onClick={handleWishItem}>
            ♥️ 관심 ♥️
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
