import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header, HEADER_HEIGHT } from './Header';
import { ScrollToTop } from './ScrollToTop';

export const Layout = () => (
  <Wrapper>
    <ScrollToTop />
    <Header />
    <InnerWrapper>
      <Outlet />
      <Footer />
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: ${HEADER_HEIGHT};
`;
