import Container from '@components/atoms/container/Container';
import Image from '@components/atoms/image/Image';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import { useContext } from 'react';
import { ThemeContext } from '@/providers/ThemeContextProvider';

interface ThemeItemProps {
  themeKey: string;
}

function ThemeItem({ themeKey }: ThemeItemProps) {
  const { themes } = useContext(ThemeContext);
  const theme = themes[themeKey];

  return (
    <Link to={Paths.THEME_PAGE(themeKey)}>
      <Container padding="25px 35px 24px">
        <Container elementSize="full-width" flexDirection="column" alignItems="center">
          <Image src={theme.imageURL} ratio="square" radius={32} />
          <p css={css`
          font-size: 16px;
          padding-top: 7px;
        `}
          >
            {theme.label}
          </p>
        </Container>
      </Container>
    </Link>
  );
}

export default ThemeItem;
