import { useCallback, useState } from 'react';
import {
  useSuspenseQuery,
} from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { fetchProducts } from '@utils/query';
import ProductDisplaySection from '@components/organisms/product/ProductDisplaySection';
import Container from '@components/atoms/container/Container';
import Button from '@components/atoms/button/Button';
import { ProductData } from '@/dto';
import { RankFilter, TargetFilter } from '@/types';

interface RankingProductDisplayAreaProps {
  targetFilter: TargetFilter;
  rankFilter: RankFilter;
}

function RankingProductDisplayArea({ targetFilter, rankFilter }: RankingProductDisplayAreaProps) {
  const [isFolded, setIsFolded] = useState(true);

  const { data: products = [] } = useSuspenseQuery<ProductData[]>({
    queryKey: [QueryKeys.RANKING_PRODUCTS, targetFilter, rankFilter],
    queryFn: () => fetchProducts({ targetType: targetFilter, rankType: rankFilter }),
  });

  const DISPLAY_COUNT_WHEN_FOLDED = 6;

  const showButton = useCallback(
    () => products?.length > DISPLAY_COUNT_WHEN_FOLDED,
    [products],
  );

  return (
    <>
      <Container padding="0 0 20px 0">
        <ProductDisplaySection
          products={isFolded ? products?.slice(0, DISPLAY_COUNT_WHEN_FOLDED) : products}
          maxColumns={6}
          minColumns={3}
          indexed
        />
      </Container>
      <Container elementSize="full-width" justifyContent="center">
        <Container elementSize="full-width" maxWidth="480px">
          {showButton()
            ? (
              <Button
                theme="lightGray"
                elementSize={{ width: '100%', height: '60px' }}
                text={isFolded ? '더보기' : '접기'}
                onClick={() => {
                  setIsFolded(!isFolded);
                }}
              />
            )
            : null}
        </Container>
      </Container>
    </>
  );
}

export default RankingProductDisplayArea;
