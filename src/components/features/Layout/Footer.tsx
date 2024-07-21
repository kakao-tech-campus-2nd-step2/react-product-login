import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <p>카카오톡 선물하기</p>
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.footer`
  padding: 28px 16px 88px;
  width: 100%;
  max-width: 100vw;
  background-color: #fafafc;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 120px;
  }
`;
