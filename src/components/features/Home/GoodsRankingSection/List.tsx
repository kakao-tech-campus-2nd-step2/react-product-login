import styled from '@emotion/styled';
import { useState } from 'react';

import type { ProductData } from '@/api/type';
import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import { breakpoints } from '@/styles/variants';

type Props = {
  goodsList: ProductData[];
};

export const GoodsRankingList = ({ goodsList }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  return (
    <Wrapper>
      <ListMapper<ProductData>
        items={currentGoodsList}
        ItemComponent={({ item, index }) => (
          <RankingGoodsItems
            key={item.id}
            rankingIndex={index + 1}
            imageSrc={item.imageURL}
            title={item.name}
            amount={item.price.sellingPrice}
            subtitle={item.brandInfo.name}
          />
        )}
        Wrapper={Grid}
        wrapperProps={{
          columns: {
            initial: 3,
            sm: 4,
            md: 6,
          },
          gap: 16,
        }}
      />

      <ButtonWrapper>
        <Button
          theme="outline"
          style={{ maxWidth: '480px' }}
          onClick={() => {
            setHasMore((prev) => !prev);
          }}
        >
          {hasMore ? '접기' : '더보기'}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 0 30px;
  width: 100%;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 30px;
`;
