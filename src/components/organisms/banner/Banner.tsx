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
  const { categories } = useContext(CategoryContext);
  const category = categories[categoryId];

  return (
    <Container backgroundColor={category?.color || backgroundColors.containerDark} elementSize="full-width" justifyContent="center">
      <Container maxWidth={MAX_CONTENT_WIDTH} elementSize="full-width" padding="50px 20px">
        <Container flexDirection="column">
          <CategoryName>
            {category?.name}
          </CategoryName>
          <CategoryTitle>
            {category?.name}
          </CategoryTitle>
          <CategorySubtitle>
            {category?.description}
          </CategorySubtitle>
        </Container>
      </Container>
    </Container>
  );
}

export default Banner;
