import styled from '@emotion/styled';

import { Spinner } from '../Spinner';

import { HEADER_HEIGHT } from '@/components/features/Layout/Header';

export const LoadingView = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);
const SpinnerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
  display: flex;
  justify-content: center;
  padding: 80px 16px;
`;
