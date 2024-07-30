import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAddToWishlist, useWishlist } from '@/api/hooks/useWishlist';
import { fetchWithTokenInstance } from '@/api/instance';
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
  const [isLiked, setIsLiked] = useState(false);

  const totalPrice = detail?.price * Number(countAsString);

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { fetchWishlist } = useWishlist();
  const { addToWishlist, loading: adding } = useAddToWishlist(fetchWishlist);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetchWithTokenInstance.get('/api/wishes'); // 관심 목록을 가져와서 체크
        console.log('Check if liked response:', response.data); // 응답 데이터 확인
        const wishlist = response.data.content;
        setIsLiked(wishlist.some((wish: { product: { id: number } }) => wish.product.id === numericProductId));
      } catch (error) {
        console.error('관심 목록 확인 실패', error);
      }
    };
    checkIfLiked();
  }, [numericProductId]);

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
      setIsLiked(true); // 하트를 빨간색으로 변경
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
          <Button
            theme='black'
            size='large'
            onClick={handleLike}
            disabled={adding}
            style={{ color: isLiked ? 'red' : 'white' }} // 하트 색상 변경
          >
            <Text fontSize={30}>{isLiked ? '♥' : '♡'}</Text>
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
