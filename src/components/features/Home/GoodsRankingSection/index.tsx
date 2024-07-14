import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { useGetRankingProducts } from '@/api/hooks/useGetRankingProducts';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isLoading, isError } = useGetRankingProducts(filterOption);

  const GoodRankingListView = useCallback(() => {
    const goodsList = data?.products ?? [];

    if (isError) {
      return <TextView>데이터를 불러오는 중에 문제가 발생했습니다.</TextView>;
    }
    if (isLoading && !goodsList.length) {
      return <TextView>로딩중</TextView>;
    }

    return <GoodsRankingList goodsList={goodsList} />;
  }, [isLoading, data, isError]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodRankingListView />
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

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
