import Container from '@components/atoms/container/Container';
import Image from '@components/atoms/image/Image';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import { useContext } from 'react';
import { CategoryContext } from '@/providers/CategoryContextProvider';

interface ThemeItemProps {
  categoryId: string;
}

function ThemeItem({ categoryId }: ThemeItemProps) {
  const { themes } = useContext(CategoryContext);
  const theme = themes[categoryId];

  return (
    <Link to={Paths.CATEGORY_PAGE(categoryId)}>
      <Container padding="25px 35px 24px">
        <Container elementSize="full-width" flexDirection="column" alignItems="center">
          <Image src={theme.imageUrl} ratio="square" radius={32} />
          <p css={css`
          font-size: 16px;
          padding-top: 7px;
        `}
          >
            {theme.name}
          </p>
        </Container>
      </Container>
    </Link>
  );
}

export default ThemeItem;
