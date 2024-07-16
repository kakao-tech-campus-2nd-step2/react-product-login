import Image from '@components/atoms/image/Image';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import {
  Amount, GoodsItemWrapper, RankingBadge, Subtitle, Title,
} from './GoodsItems.styles';
import { GoodsItemProps } from '@/types';

function GoodsItem({
  rankingIndex, imageSrc, subtitle, title, amount, productId,
}: GoodsItemProps) {
  return (
    <GoodsItemWrapper>
      <Link to={Paths.PRODUCT_DETAILS(productId.toString())}>
        {rankingIndex ? (
          <RankingBadge rankingIndex={rankingIndex}>
            <p>{rankingIndex}</p>
          </RankingBadge>
        ) : null}
        <Image ratio="square" radius={3} src={imageSrc} />
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
        <Amount>
          {amount}
          원
        </Amount>
      </Link>
    </GoodsItemWrapper>
  );
}

export default GoodsItem;
