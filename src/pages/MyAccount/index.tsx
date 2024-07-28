import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  useToast, // Import useToast for showing notifications
} from '@chakra-ui/react';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';
import { getWishListPath, useGetWishList } from '@/api/hooks/useFindWishList'; // Adjust the import path if necessary
import { useDeleteWishList } from '@/api/hooks/useDeleteWishList'; // Import the delete hook
import { queryClient } from '@/api/instance';

export const MyAccountPage = () => {
  const { authInfo } = useAuth();
  const { data, isLoading, isError, error } = useGetWishList();
  const { mutate: deleteWish } = useDeleteWishList();
  const toast = useToast();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleDelete = (wishId: number) => {
    deleteWish(
      { wishId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getWishListPath()] });

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
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="xl">
          안녕하세요, {authInfo?.name}님!
        </Heading>

        <Button size="sm" colorScheme="teal" onClick={handleLogout}>
          로그아웃
        </Button>

        {/* Wishlist Section */}
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
      </VStack>
    </Container>
  );
};
