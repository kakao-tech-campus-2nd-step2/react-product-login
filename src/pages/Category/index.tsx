import { Navigate, useParams } from 'react-router-dom';

import useGetCategories from '@/api/hooks/useGetCategories';
import Loading from '@/components/common/Loading';
import { CategoryGoodsSection } from '@/components/features/Category/CategoryGoodsSection';
import {
  CategoryHeroSection,
  getCurrentCategory,
} from '@/components/features/Category/CategoryHeroSection';
import { RouterPath } from '@/routes/path';

export const CategoryPage = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();

  const {
    data: categoryList,
    isLoading: isThemeListLoading,
    isError: isThemeListError,
  } = useGetCategories();

  const currentTheme = getCurrentCategory(categoryId, categoryList || []);

  if (!isThemeListLoading && !currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <Loading isLoading={isThemeListLoading} error={isThemeListError}>
        <CategoryHeroSection categoryId={categoryId} categoryList={categoryList || []} />
      </Loading>
      <CategoryGoodsSection categoryId={categoryId} />
    </>
  );
};
