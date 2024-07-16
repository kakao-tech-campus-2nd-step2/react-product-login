import { useRankFilters } from '@/pages/HomePage/hooks/useRankFilters';

import { Content } from '@/components/Content';
import { Container } from '@/components/ui/Layout/Container';

import { GoodsRankingFilter } from './GoodsRankingFilter';
import { GoodsRankingList } from './GoodsRankingList';
import { titleStyle } from './styles';

export const GoodsRankingSection = () => {
  const { filter, handleFilter } = useRankFilters();

  return (
    <Content flexDirection="column" height="fit-content" gap="2rem">
      <Container justifyContent="center" css={titleStyle}>
        실시간 급상승 선물랭킹
      </Container>
      <GoodsRankingFilter filter={filter} handleFilter={handleFilter} />
      <GoodsRankingList filter={filter} />
    </Content>
  );
};
