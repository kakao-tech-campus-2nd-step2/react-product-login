import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { HeartIcon } from '@/components/common/Icons/HeartIcon';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail, error: detailError } = useGetProductDetail({ productId });
  const { data: options, error: optionsError } = useGetProductOptions({ productId });

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [countAsString, setCountAsString] = useState('1');

  const selectedOption = useMemo(() => {
    return options?.find((option) => option.id === selectedOptionId);
  }, [options, selectedOptionId]);

  const totalPrice = useMemo(() => {
    const price = detail?.price ?? 0;
    return price * Number(countAsString);
  }, [detail?.price, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }

    orderHistorySessionStorage.set({
      id: productId,
      optionId: selectedOption.id,
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  const handleWishClick = () => {
    // 위시리스트 추가 로직 구현 (아직 구현되지 않음)
    alert('위시리스트에 추가되었습니다.');
  };

  if (!detail || !options) {
    return <div>Loading...</div>;
  }

  if (optionsError || detailError) {
    return <div>Error loading product details or options.</div>;
  }

  return (
    <Wrapper>
      <select onChange={(e) => setSelectedOptionId(Number(e.target.value))}>
        <option value="">옵션을 선택하세요</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} (재고: {option.quantity})
          </option>
        ))}
      </select>
      {selectedOption && (
        <CountOptionItem
          name={selectedOption.name}
          value={countAsString}
          onChange={setCountAsString}
          minValues={1}
          maxValues={selectedOption.quantity}
        />
      )}
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <WishButton onClick={handleWishClick}>
          <HeartIcon width={160} height={20} />
          위시리스트에 추가
        </WishButton>
        <Button theme="black" size="large" onClick={handleClick} disabled={!selectedOption}>
          나에게 선물하기
        </Button>
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

const WishButton = styled.button`
  margin-bottom: 30px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  &:hover {
    background-color: #e0e0e0;
  }
`;
