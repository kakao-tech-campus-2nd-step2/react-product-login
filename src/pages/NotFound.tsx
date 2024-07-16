import { css } from '@emotion/react';

import { Link } from 'react-router-dom';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ROUTER_PATH } from '@/routes/path';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

const containerStyle = css({
  height: '100vh',
});
const titleStyle = css({
  fontSize: '2.5rem',
});

const NotFound = () => {
  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="2rem"
      css={containerStyle}
    >
      <h1 css={titleStyle}>{API_ERROR_MESSAGES.PAGE_NOT_FOUND}</h1>
      <Link to={ROUTER_PATH.HOME}>
        <Button theme="outline" css={{ width: '12rem' }}>
          메인 페이지로 돌아가기
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
