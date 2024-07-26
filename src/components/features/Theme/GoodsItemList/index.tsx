import React from 'react';
import styled from '@emotion/styled';
import { GoodsItem, Grid, CenteredContainer, StatusHandler } from '@components/common';
import { Link, useParams } from 'react-router-dom';
import useGoodsItemListQuery from '@hooks/useGoodsItemListQuery';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { ThemeProductsRequest } from '@internalTypes/requestTypes';
import { getDynamicPath } from '@utils/getDynamicPath';
import { ROUTE_PATH } from '@routes/path';

const GRID_GAP = 14;
const GRID_COLUMNS = 4;
const MAX_RESULTS = 20;

export default function GoodsItemList() {
  const { themeKey } = useParams<Pick<ThemeProductsRequest, 'themeKey'>>();
  const { products, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useGoodsItemListQuery(
    { themeKey, rowsPerPage: MAX_RESULTS },
  );
  const ref = useInfiniteScroll({ condition: hasNextPage && !isFetchingNextPage, fetchNextPage });

  const isEmpty = products.length === 0;

  return (
    <GoodsItemListContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
        >
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {products.map((product) => (
              <Link key={product.id} to={getDynamicPath(ROUTE_PATH.PRODUCT, { productId: product.id.toString() })}>
                <GoodsItem
                  imageSrc={product.imageURL}
                  amount={product.price.basicPrice}
                  subtitle={product.brandInfo.name}
                  title={product.name}
                />
              </Link>
            ))}
            {hasNextPage && <div ref={ref} />}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </GoodsItemListContainer>
  );
}

const GoodsItemListContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 360px;
`;
