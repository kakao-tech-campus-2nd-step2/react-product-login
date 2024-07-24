import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import ProductDisplaySection from '@components/organisms/product/ProductDisplaySection';
import { useEffect, useRef } from 'react';
import useFetchCategoryProducts from '@hooks/useFetchCategoryProducts';
import { css } from '@emotion/react';
import useInView from '@hooks/useInView';
import { generateRandomId } from '@/utils';

interface CategoryProductDisplaySectionProps {
  categoryId: number;
}

function CategoryProductDisplaySection({ categoryId }: CategoryProductDisplaySectionProps) {
  const productDisplayId = useRef(generateRandomId());
  const {
    productResponse, hasNextPage, fetchNextPage, isFetchingNextPage,
  } = useFetchCategoryProducts({ categoryId });

  const bottomRef = useRef<HTMLDivElement>(null);

  const { inView } = useInView({
    ref: bottomRef,
    threshold: 1,
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;

    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {productResponse?.pages?.map((page, index) => {
        const key = `${productDisplayId}-${index}`;

        return (
          <ProductDisplaySection
            products={page.content}
            maxColumns={4}
            minColumns={2}
            key={key}
          />
        );
      })}
      {isFetchingNextPage ? (
        <ProductSkeletonGrid columnsDefault={4} itemCount={4} columnsSm={2} />
      ) : null}
      <div
        css={css`
          width: 100%;
          height: 300px;
        `}
        ref={bottomRef}
      />
    </>
  );
}

export default CategoryProductDisplaySection;
