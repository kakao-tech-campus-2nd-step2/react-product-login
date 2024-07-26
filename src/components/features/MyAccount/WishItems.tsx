import { IconButton } from '@chakra-ui/react';
import { IoMdTrash } from 'react-icons/io';
import { Link } from 'react-router-dom';

import useDeleteWishes from '@/api/hooks/useDeleteWishes';
import type { WishesData } from '@/api/type';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';

type WishItemsProps = {
  item: WishesData;
} & React.HTMLAttributes<HTMLDivElement>;

function WishItems({ item, ...props }: WishItemsProps) {
  const { mutateAsync: deleteWished } = useDeleteWishes();

  const handleDelete = () => {
    deleteWished({ wishId: item.id });
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
      {...props}
    >
      <IconButton
        right="2"
        top="2"
        bg="transparent"
        borderRadius="full"
        color="red"
        position="absolute"
        aria-label="delete"
        onClick={handleDelete}
        icon={<IoMdTrash size="30" />}
      />
      <Link to={`/products/${item.id}`}>
        <DefaultGoodsItems
          key={item.id}
          imageSrc={item.product.imageUrl}
          title={item.product.name}
          amount={item.product.price}
        />
      </Link>
    </div>
  );
}

export default WishItems;
