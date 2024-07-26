import { Card, CardBody, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';

type Props = {
  name: string;
  price: number;
  imageUrl: string;
};

export const WishItem = ({ name, price, imageUrl }: Props) => {
  const handleClick = () => {
    //TODO: wishlist에서 해당 항목 삭제
  };
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
      <Image src={imageUrl} width={150} />
      <CardBody>
        <Heading size="md">{name}</Heading>
        <Text>{price}원</Text>
      </CardBody>
      <Liked onClick={handleClick}>❤️</Liked>
    </Card>
  );
};
const Text = styled.div`
  font-size: 22px;
`;
const Liked = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
