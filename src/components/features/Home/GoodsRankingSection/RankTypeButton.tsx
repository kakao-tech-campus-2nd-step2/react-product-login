import styled from '@emotion/styled';

import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

type Props = {
  label: string;
  value: RankingFilterOption['rankType'];
  selected: boolean;
  onClick: (value: RankingFilterOption['rankType']) => void;
};

export const RankTypeButton = ({ value, selected, label, onClick }: Props) => {
  return (
    <Wrapper
      selected={selected}
      onClick={() => {
        onClick(value);
      }}
    >
      {label}
    </Wrapper>
  );
};

const Wrapper = styled.button<Pick<Props, 'selected'>>`
  padding: 13px 20px;
  font-size: 16px;
  line-height: 16px;
  color: ${({ selected }) => (selected ? '#4684e9' : 'rgba(70, 132, 233, 0.7)')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  transition:
    color 200ms,
    font-weight 200ms;

  &:focus {
    outline: none;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 20px 30px;
    font-size: 22px;
    line-height: 22px;
  }
`;
