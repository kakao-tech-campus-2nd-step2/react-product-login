import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button as ChakraButton, Flex, Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { authSessionStorage, orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';
import { useAddWishList } from '@/api/hooks/useAddWishList';

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
  const addWishListMutation = useAddWishList();

  authSessionStorage.get();
  const handleClick = () => {
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

  const handleWishlistClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    addWishListMutation.mutate({ productId: parseInt(productId) });

    // 관심 등록 로직을 여기에 추가합니다.
    alert('관심 등록이 완료되었습니다!');
  };

  return (
    <Wrapper>
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Flex justify="space-between">
          <WishlistButton onClick={handleWishlistClick}>
            <Icon as={FaHeart} w={6} h={6} color="red.500" />
          </WishlistButton>
          <Button theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </Flex>
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

const WishlistButton = styled(ChakraButton)`
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
`;
