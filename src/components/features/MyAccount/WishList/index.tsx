import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useDeleteWishList } from '@/api/hooks/useDeleteWishList';
import { useGetWishList } from '@/api/hooks/useFindWishList';
import { queryClient } from '@/api/instance';

const WishList = () => {
  const { data, isLoading, isError, error } = useGetWishList();

  const { mutate: deleteWish } = useDeleteWishList();
  const toast = useToast();

  const handleDelete = (wishId: number) => {
    deleteWish(
      { wishId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [findWishListPath()] });

          toast({
            title: '삭제 완료',
            description: '관심 목록에서 항목이 삭제되었습니다.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: '삭제 실패',
            description: '관심 목록에서 항목을 삭제하는 데 실패했습니다.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      },
    );
  };
  return (
    <Box width="full">
      <Heading as="h2" size="lg" mb={4}>
        관심 목록
      </Heading>
      {isLoading && <Spinner />}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <Text>{error.message}</Text>
        </Alert>
      )}
      {data?.content?.length === 0 && <Text>관심 목록이 비어 있습니다.</Text>}
      {(data?.content?.length ?? 0) > 0 && (
        <VStack spacing={4} align="stretch">
          {data?.content.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              bg="white"
              boxShadow="md"
            >
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                borderRadius="md"
                boxSize="100px"
                objectFit="cover"
                mb={4}
              />
              <Text fontWeight="bold">{item.product.name}</Text>
              <Text color="gray.600">${item.product.price}</Text>
              <Button
                colorScheme="red"
                size="sm"
                mt={4}
                onClick={() => handleDelete(item.id)}
                isLoading={isLoading}
              >
                삭제
              </Button>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default WishList;
function findWishListPath(): unknown {
  throw new Error('Function not implemented.');
}
