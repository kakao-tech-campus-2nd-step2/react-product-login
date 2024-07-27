import styled from '@emotion/styled';

import { usePostWishlist } from '@/api/hooks/postWishlist';
import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

import { GoodsDetailHeader } from './Header';

type Props = ProductDetailRequestParams;

export const GoodsDetail = ({ productId }: Props) => {
  const onSuccess = () => alert('관심 등록 완료');
  const { mutate: addWishlist } = usePostWishlist({ onSuccess });

  const handleAddWishList = () => addWishlist({ productId });

  return (
    <Wrapper>
      <GoodsDetailHeader productId={productId} />
      <Button onClick={handleAddWishList}>관심 상품 등록</Button>
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

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
