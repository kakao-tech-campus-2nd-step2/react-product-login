import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ProductDetailRequestParams} from '@/api/hooks/useGetProductDetail';
import {useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const toast = useToast();

  const handleFavoriteClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorite = {
      id: parseInt(productId),
      name: detail.name,
      price: detail.price,
      imageUrl: detail.imageUrl,
    };

    localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));

    toast({
      title: '관심 상품이 등록되었습니다.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  return (
    <Box p="30px 12px 30px 30px" h="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <Box mt="auto">
        <Flex justifyContent="space-between" mb="20px" p="18px 20px" borderRadius="4px" bg="#f5f5f5">
          <Text fontSize="14px" fontWeight="700" lineHeight="14px" color="#111">총 결제 금액</Text>
          <Text fontSize="20px" letterSpacing="-0.02em">{totalPrice}원</Text>
        </Flex>
        <Flex justifyContent="space-between" mt="20px" gap="12px">
          <Button colorScheme="yellow" size="lg" onClick={handleFavoriteClick}>
            ❤️ 관심 상품 등록
          </Button>
          <Button colorScheme="blackAlpha" size="lg" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
