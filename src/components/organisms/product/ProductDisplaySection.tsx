import GoodsItem from '@components/molecules/goodsItem/GoodsItem';
import { useRef } from 'react';
import ResponsiveGrid from '@components/atoms/grid/responsive/ResponsiveGrid';
import Container from '@components/atoms/container/Container';
import { generateRandomId, isEmptyList } from '@/utils';
import { ProductData } from '@/dto';

interface ProductDisplaySectionProps {
  products: ProductData[];
  indexed?: boolean,
  maxColumns: number,
  minColumns: number,
}

function ProductDisplaySection({
  products, indexed, maxColumns, minColumns,
}: ProductDisplaySectionProps) {
  const sectionRandomId = useRef(generateRandomId());

  return isEmptyList(products) ? (
    <Container elementSize="full-width" justifyContent="center">
      <p>표시할 데이터가 없어요</p>
    </Container>
  ) : (
    <ResponsiveGrid gap={16} columnsDefault={maxColumns} columnsSm={minColumns}>
      {products.map((product, i) => {
        const key = `${sectionRandomId.current}-gift-${i}`;

        return (
          <GoodsItem
            imageSrc={product.imageUrl}
            subtitle={product.name}
            title={product.name}
            amount={product.price}
            rankingIndex={indexed ? i + 1 : undefined}
            productId={product.id}
            key={key}
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default ProductDisplaySection;
