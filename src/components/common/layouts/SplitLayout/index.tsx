import styled from '@emotion/styled';

import { HEADER_HEIGHT } from '@/components/features/Layout/Header';
import { breakpoints } from '@/styles/variants';

import { Container } from '../Container';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export const SplitLayout = ({ children, sidebar }: Props) => {
  return (
    <Wrapper>
      <Container maxWidth={breakpoints.lg}>
        <Inner>
          <Main>{children}</Main>
          <Sidebar>{sidebar}</Sidebar>
        </Inner>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const Main = styled.main`
  width: 100%;
  max-width: 900px;
`;

const Sidebar = styled.aside`
  display: none;
  position: sticky;
  top: ${HEADER_HEIGHT};
  width: 100%;
  max-width: 360px;
  height: calc(100vh - ${HEADER_HEIGHT});

  @media screen and (min-width: ${breakpoints.sm}) {
    display: block;
  }
`;
