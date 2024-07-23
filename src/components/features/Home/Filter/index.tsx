import React from 'react';
import styled from '@emotion/styled';
import { useFilter } from '@context/filter/useFilter';
import Wish from './Wish';
import Target from './Target';

export default function Filter() {
  const { selectedTarget, selectedWish, selectTarget, selectWish } = useFilter();

  return (
    <FilterContainer>
      <TargetContainer>
        <Target selectedTarget={selectedTarget} selectTarget={selectTarget} />
      </TargetContainer>
      <Wish selectedWish={selectedWish} selectWish={selectWish} />
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 7px;
`;

const TargetContainer = styled.div`
  margin-bottom: 20px;
`;
