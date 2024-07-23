/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useGetRankingProducts } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import Loading from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const {
    data: rankingProducts,
    refetch: refetchRankingProducts,
    isLoading,
    isError,
  } = useGetRankingProducts({
    targetType: filterOption.targetType,
    rankType: filterOption.rankType,
  });

  const goodsList = rankingProducts?.products || [];

  useEffect(() => {
    refetchRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <Loading isLoading={isLoading} error={isError}>
          <GoodsRankingList goodsList={goodsList} />
        </Loading>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;

  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;
