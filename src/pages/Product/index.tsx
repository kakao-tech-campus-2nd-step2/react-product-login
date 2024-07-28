import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { AsyncBoundary, CenteredContainer, Spinner } from '@components/common';
import ProductInfo from '@components/features/Product/ProductInfo';
import { Home } from '@pages/index';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
// import ProductOrder from '@components/features/Product/ProductOrder';
import useProductData from './hooks/useProductData';

export default function Product() {
  const { productDetailData } = useProductData();
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  return (
    <AsyncBoundary pendingFallback={<Spinner />} rejectedFallback={<Home />}>
      <Layout>
        <CenteredContainer maxWidth="lg">
          <InnerContainer>
            <ProductInfo
              name={productDetailData?.detail.name}
              image={productDetailData?.detail.imageURL}
              price={productDetailData?.detail.price.basicPrice}
            />
            {/* <ProductOrder
              name={productDetailData?.detail.name}
              giftOrderLimit={productOptionData?.options.giftOrderLimit}
            /> */}
          </InnerContainer>
        </CenteredContainer>
      </Layout>
    </AsyncBoundary>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;
