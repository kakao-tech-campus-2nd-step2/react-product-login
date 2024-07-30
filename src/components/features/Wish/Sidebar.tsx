import styled from '@emotion/styled';

import { HEADER_HEIGHT } from '../Layout/Header';

export const Sidebar = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  padding-bottom: 100px;
  border-left: 1px solid #ededed;
`;
