import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import { useEffect, useRef } from 'react';
import useFetchThemeProducts from '@hooks/useFetchThemeProducts';
import { css } from '@emotion/react';
import useInView from '@hooks/useInView';
import { generateRandomId } from '@/utils';

interface ThemeProductDisplaySectionProps {
  themeKey: string;
}

function ThemeProductDisplaySection({ themeKey }: ThemeProductDisplaySectionProps) {
  const productDisplayId = useRef(generateRandomId());
  const {
    productResponse, hasNextPage, fetchNextPage, isFetchingNextPage,
  } = useFetchThemeProducts({ themeKey: themeKey || '' });

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
          <GiftDisplaySection
            products={page.products}
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

export default ThemeProductDisplaySection;
