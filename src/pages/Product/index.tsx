import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@components/features/Product/ProductInfo';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
import ProductOrder from '@components/features/Product/ProductOrder';
import useProductData from './hooks/useProductData';

export default function Product() {
  const { productDetailData, productOptionData } = useProductData();
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo
            name={productDetailData?.detail.name}
            image={productDetailData?.detail.imageURL}
            price={productDetailData?.detail.price.basicPrice}
          />
          <ProductOrder
            name={productDetailData?.detail.name}
            giftOrderLimit={productOptionData?.options.giftOrderLimit}
          />
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;
