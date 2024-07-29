import { useCurrentCategory } from '@/api/hooks/useCurrentCategories';

import { Content } from '@/components/Content';
import { OneTextContainer } from '@/components/OneTextContainer';

import { heroStyle, textStyle } from './styles';

type CategoryHeroSectionProps = {
  categoryId: number;
};

export const CategoryHeroSection = ({
  categoryId,
}: CategoryHeroSectionProps) => {
  const { currentCaterogy, error } = useCurrentCategory(categoryId);

  if (error?.message) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  const { color, name, description } = currentCaterogy;

  return (
    <Content
      backgroundColor={color}
      flexDirection="column"
      gap="0.5rem"
      css={heroStyle}
    >
      <p css={textStyle('label')}>{name}</p>
      <p css={textStyle('title')}>{description}</p>
    </Content>
  );
};
