import { Suspense, useState } from 'react';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import TargetFilterArea
  from '@components/organisms/main/ranking/TargetFilterArea';
import RankFilterArea from '@components/organisms/main/ranking/RankFilterArea';
import {
  RankingSectionTitle,
  RankingSectionTitleContainer,
} from '@components/organisms/main/ranking/RankingSection.styles';
import RankingGiftDisplayArea
  from '@components/organisms/main/ranking/RankingGiftDisplayArea';
import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import { RankFilter, TargetFilter } from '@/types';

function RankingSection() {
  const [targetFilter, setTargetFilter] = useState<TargetFilter>('ALL');
  const [rankFilter, setRankFilter] = useState<RankFilter>('MANY_WISH');

  return (
    <Container elementSize="full-width" justifyContent="center">
      <Container
        elementSize="full-width"
        maxWidth={MAX_CONTENT_WIDTH}
        padding="0 16px 80px"
        flexDirection="column"
      >
        <RankingSectionTitleContainer>
          <RankingSectionTitle>
            실시간 급상승 선물랭킹
          </RankingSectionTitle>
        </RankingSectionTitleContainer>
        <TargetFilterArea
          currentFilter={targetFilter}
          setTargetFilter={setTargetFilter}
        />
        <RankFilterArea
          currentFilter={rankFilter}
          setPopularityFilter={setRankFilter}
        />
        <Container padding="40px 0 0 0" flexDirection="column">

          <ErrorBoundary>
            <Suspense fallback={
              <ProductSkeletonGrid columnsDefault={6} itemCount={6} columnsSm={3} />
            }
            >
              <RankingGiftDisplayArea targetFilter={targetFilter} rankFilter={rankFilter} />
            </Suspense>
          </ErrorBoundary>
        </Container>
      </Container>
    </Container>
  );
}

export default RankingSection;
