import { Card, CardBody, Heading, Image, Text } from '@chakra-ui/react';

interface Props {
  imageURL: string;
  name: string;
  price: number;
}

export default ({ imageURL, name, price }: Props) => {
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={imageURL}
        alt="Caffe Latte"
      />

      <CardBody>
        <Heading size="md">{name}</Heading>

        <Text py="2">{price}원</Text>
      </CardBody>
    </Card>
  );
};
