import Container from '@components/atoms/container/Container';
import Image from '@components/atoms/image/Image';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import ResponsiveContainer
  from '@components/atoms/container/ResponsiveContainer';
import { BREAKPOINT_SM } from '@styles/size';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { CategoryContext } from '@/providers/CategoryContextProvider';

interface CategoryItemProps {
  categoryId: string;
}

const ResponsiveCategoryCaption = styled.p`
  font-size: 16px;
  padding-top: 7px;
  @media (max-width: ${BREAKPOINT_SM}) {
    font-size: 13px;
  }
`;

function MainCategoryItem({ categoryId }: CategoryItemProps) {
  const { categories } = useContext(CategoryContext);
  const category = categories[categoryId];

  return (
    <Link to={Paths.CATEGORY_PAGE(categoryId)}>
      <Container padding="13px 0px 12px">
        <Container
          elementSize="full-width"
          flexDirection="column"
          alignItems="center"
        >
          <ResponsiveContainer sizeDefault={{ width: '90px', height: '90px' }} sizeSm={{ width: '50px', height: '50px' }}>
            <Image
              src={category.imageUrl}
              ratio="square"
              css={css`
                border-radius: 32px;
                @media (max-width: ${BREAKPOINT_SM}) {
                  border-radius: 18px;
                }
            `}
            />
          </ResponsiveContainer>
          <ResponsiveCategoryCaption>
            {category.name}
          </ResponsiveCategoryCaption>
        </Container>
      </Container>
    </Link>
  );
}

export default MainCategoryItem;
