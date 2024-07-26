import { useRef } from 'react';
import ResponsiveGrid from '@components/atoms/grid/responsive/ResponsiveGrid';
import Container from '@components/atoms/container/Container';
import WishItem from '@components/organisms/mypage/WishItem';
import { generateRandomId, isEmptyList } from '@/utils';
import { WishData } from '@/dto';

interface ProductDisplaySectionProps {
  wishes: WishData[];
  maxColumns: number,
  minColumns: number,
}

function WishesContent({
  wishes, maxColumns, minColumns,
}: ProductDisplaySectionProps) {
  const sectionRandomId = useRef(generateRandomId());

  return isEmptyList(wishes) ? (
    <Container elementSize="full-width" justifyContent="center">
      <p>표시할 데이터가 없어요</p>
    </Container>
  ) : (
    <ResponsiveGrid gap={16} columnsDefault={maxColumns} columnsSm={minColumns}>
      {wishes.map((wish, i) => {
        const key = `${sectionRandomId.current}-gift-${i}`;

        return (
          <WishItem
            wishData={wish}
            key={key}
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default WishesContent;
