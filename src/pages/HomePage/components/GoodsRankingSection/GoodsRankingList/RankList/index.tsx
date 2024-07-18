import { Link } from 'react-router-dom';

import { getDynamicPath } from '@/routes/path';
import { ProductData } from '@/types/productType';

import { RankingGoodsItem } from '@/components/GoodsItem/Ranking/Ranking';
import { Grid } from '@/components/ui/Layout/Grid';

type RankListProps = {
  filteredRankList: ProductData[];
};

export const RankList = ({ filteredRankList }: RankListProps) => {
  return (
    <Grid
      columns={{
        initial: 2,
        sm: 3,
        md: 4,
      }}
      gap={12}
    >
      {filteredRankList.map(
        ({ id, imageURL, name, brandInfo, price }: ProductData, index) => (
          <Link to={getDynamicPath.products(id)} key={id}>
            <RankingGoodsItem
              imageSrc={imageURL}
              rank={index + 1}
              title={name}
              subtitle={brandInfo.name}
              amount={price.sellingPrice}
              isLazy={index > 5}
            />
          </Link>
        )
      )}
    </Grid>
  );
};
