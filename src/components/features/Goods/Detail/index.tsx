import styled from '@emotion/styled';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

import { GoodsDetailHeader } from './Header';
import { InterestButton } from './InterestButton';

type Props = ProductDetailRequestParams;

export const GoodsDetail = ({ productId }: Props) => {
  return (
    <Wrapper>
      <GoodsDetailHeader productId={productId} />
      <InterestButtonWrapper>
        <InterestButton productId={productId} />
      </InterestButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 16px 16px 60px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px 32px 80px;
  }
`;

const InterestButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
