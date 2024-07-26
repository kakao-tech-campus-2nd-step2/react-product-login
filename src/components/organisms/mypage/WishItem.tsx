import {
  Amount,
  GoodsItemWrapper,
  Subtitle, Title,
} from '@components/molecules/goodsItem/GoodsItems.styles';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import Image from '@components/atoms/image/Image';
import { WishRemoveButton } from '@components/organisms/mypage/WishesContent.styles';
import { useCallback } from 'react';
import { deleteWishProduct } from '@utils/query';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { WishData } from '@/dto';

interface WishItemProps {
  wishData: WishData;
}

function WishItem({
  wishData,
}: WishItemProps) {
  const { product } = wishData;

  const onClickRemove = useCallback(async () => {
    try {
      await deleteWishProduct({
        wishId: wishData.id,
      });
      alert('삭제가 완료되었습니다.');
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          alert('관심목록을 찾을 수 없습니다.');
        }

        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          alert('인증되지 않은 사용자입니다.');
        }
      }

      console.error(error);
    }
  }, [wishData]);

  return (
    <GoodsItemWrapper>
      <WishRemoveButton onClick={onClickRemove}>
        X
      </WishRemoveButton>
      <Link to={Paths.PRODUCT_DETAILS(product.id.toString())}>
        <Image ratio="square" radius={3} src={product.imageUrl} />
        <Subtitle>{product.name}</Subtitle>
        <Title>{product.name}</Title>
        <Amount>
          {product.price}
          원
        </Amount>
      </Link>
    </GoodsItemWrapper>
  );
}

export default WishItem;
