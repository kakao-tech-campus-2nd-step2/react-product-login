import styled from '@emotion/styled';
import Container from '@components/atoms/container/Container';
import { TargetFilter } from '@/types';

interface TargetFilterProps {
  currentFilter: string;
  setTargetFilter: (filter: TargetFilter) => void;
}

const FilterButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#a8c8ff' : '#e6f0ff')};
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

function TargetFilterArea({ currentFilter, setTargetFilter }: TargetFilterProps) {
  const filterNames: {
    [key in TargetFilter]: string;
  } = {
    ALL: '전체',
    MALE: '남성이',
    FEMALE: '여성이',
    TEEN: '청소년이',
  };

  return (
    <Container
      justifyContent="space-around"
      cssProps={{
        gap: '10px',
      }}
      padding="20px 0 7px"
    >
      {(Object.keys(filterNames) as TargetFilter[]).map((filter) => {
        const key = `groupFilter-${filter}`;
        const filterName = filterNames[filter];

        return (
          <FilterButton
            key={key}
            selected={currentFilter === filter}
            onClick={() => setTargetFilter(filter)}
          >
            {filterName}
          </FilterButton>
        );
      })}
    </Container>
  );
}

export default TargetFilterArea;
