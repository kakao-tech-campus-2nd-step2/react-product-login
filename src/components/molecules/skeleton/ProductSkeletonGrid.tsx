import { useCallback, useRef } from 'react';
import ProductSkeletonItem
  from '@components/molecules/skeleton/ProductSkeletonItem';
import ResponsiveGrid from '@components/atoms/grid/responsive/ResponsiveGrid';
import { generateRandomId } from '@/utils';

interface SkeletonGridProps {
  columnsXS?: number,
  columnsSm?: number,
  columnsMd?: number,
  columnsLg?: number,
  columnsDefault: number,
  itemCount: number,
}

function ProductSkeletonGrid({
  columnsXS, columnsMd, columnsSm, columnsLg, columnsDefault, itemCount,
}: SkeletonGridProps) {
  const gridId = useRef(generateRandomId());

  const getGridItems = useCallback(() => {
    const items = [];

    for (let i = 0; i < itemCount; i += 1) {
      items.push(<ProductSkeletonItem key={`${gridId}-${i}`} />);
    }

    return items;
  }, [itemCount]);

  return (
    <ResponsiveGrid
      columnsDefault={columnsDefault}
      columnsXS={columnsXS}
      columnsSm={columnsSm}
      columnsMd={columnsMd}
      columnsLg={columnsLg}
      gap={6}
    >
      {getGridItems()}
    </ResponsiveGrid>
  );
}

export default ProductSkeletonGrid;
