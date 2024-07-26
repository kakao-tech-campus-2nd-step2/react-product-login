import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Image } from '@/components/common/Image';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { LabelText } from '../Common/LabelText';

type Props = {
  orderHistory: OrderHistory;
};

export const GoodsInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const { data: detail, isLoading, error } = useGetProductDetail({ productId: id });

  if (isLoading) {
    return (
      <Wrapper>
        <LabelText>선물내역</LabelText>
        <Spacing />
        <GoodsWrapper>
          <GoodsInfoWrapper>
            <div>Loading...</div>
          </GoodsInfoWrapper>
        </GoodsWrapper>
      </Wrapper>
    );
  }

  if (error || !detail) {
    return (
      <Wrapper>
        <LabelText>선물내역</LabelText>
        <Spacing />
        <GoodsWrapper>
          <GoodsInfoWrapper>
            <div>Error loading product details</div>
          </GoodsInfoWrapper>
        </GoodsWrapper>
      </Wrapper>
    );
  }

  const totalPrice = detail.price * count;

  return (
    <Wrapper>
      <LabelText>선물내역</LabelText>
      <Spacing />
      <GoodsWrapper>
        <GoodsInfoWrapper>
          <GoodsInfoImage>
            <Image src={detail.imageUrl} width={86} ratio="square" />
          </GoodsInfoImage>
          <GoodsInfoTextWrapper>
            <GoodsInfoTextTitle>
              {detail.name} X {count}개
            </GoodsInfoTextTitle>
            <TotalPrice>총 결제 금액: {totalPrice}원</TotalPrice>
          </GoodsInfoTextWrapper>
        </GoodsInfoWrapper>
      </GoodsWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  width: 100%;
  padding: 16px;
`;

const GoodsWrapper = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid #ededed;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
`;

const GoodsInfoWrapper = styled.div`
  display: flex;
`;

const GoodsInfoImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

const GoodsInfoTextWrapper = styled.div`
  padding-left: 8px;
`;

const GoodsInfoTextTitle = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 3px;
  color: #222;
  overflow: hidden;
`;

const TotalPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;
