import Container from '@components/atoms/container/Container';
import { backgroundColors } from '@styles/colors';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { useContext } from 'react';
import { CategoryName, CategorySubtitle, CategoryTitle } from './Banner.styles';
import { CategoryContext } from '@/providers/CategoryContextProvider';

interface BannerProps {
  categoryId: string;
}

function Banner({ categoryId }: BannerProps) {
  const { themes } = useContext(CategoryContext);
  const theme = themes[categoryId];

  return (
    <Container backgroundColor={theme?.backgroundColor || backgroundColors.containerDark} elementSize="full-width" justifyContent="center">
      <Container maxWidth={MAX_CONTENT_WIDTH} elementSize="full-width" padding="50px 20px">
        <Container flexDirection="column">
          <CategoryName>
            {theme?.label}
          </CategoryName>
          <CategoryTitle>
            {theme?.title}
          </CategoryTitle>
          <CategorySubtitle>
            {theme?.description}
          </CategorySubtitle>
        </Container>
      </Container>
    </Container>
  );
}

export default Banner;
