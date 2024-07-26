import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

import { GoodsDetailHeader } from './Header';

export const GoodsDetail = ({ productId }: { productId: string }) => {
  useGetProductDetail({ productId });

  return (
    <Wrapper>
      <GoodsDetailHeader productId={productId} />
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
