import Container from '@components/atoms/container/Container';
import {
  Box, Button, HStack, Input, Text, useNumberInput,
} from '@chakra-ui/react';
import { backgroundColors, defaultBorderColor } from '@styles/colors';
import DefaultButton from '@components/atoms/button/Button';
import {
  ChangeEvent, useCallback, useContext, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '@constants/Paths';
import { orderHistoryStorage } from '@utils/storage';
import { addWishProduct } from '@utils/query';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { LoginContext } from '@/providers/LoginContextProvider';
import { OrderHistoryData } from '@/types';

interface ProductCounterAreaProps {
  productId: number;
  productName: string;
  productPrice: number;
}

function ProductCounterForm({ productId, productPrice, productName }: ProductCounterAreaProps) {
  const [count, setCount] = useState(1);
  const loginStatus = useContext(LoginContext);
  const navigate = useNavigate();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 100,
    onChange: (_valueAsString: string, valueAsNumber: number) => {
      setCount(valueAsNumber);
    },
  });

  const checkLogin = useCallback(() => {
    if (!loginStatus.isLoggedIn) {
      const confirm = window.confirm('로그인이 필요한 페이지입니다.\n'
        + '로그인하시겠습니까?');

      if (confirm) {
        navigate(Paths.LOGIN_PAGE);
      }
    }
  }, [loginStatus.isLoggedIn, navigate]);

  const handleAddWishClick = useCallback(async () => {
    checkLogin();
    try {
      await addWishProduct({
        productId,
      });
      alert('상품 추가가 완료되었습니다.');
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case StatusCodes.BAD_REQUEST:
            alert('잘못된 요청입니다.');
            break;
          case StatusCodes.UNAUTHORIZED:
            alert('토큰 인증 오류!');
            break;
          case StatusCodes.NOT_FOUND:
            alert('상품 정보를 찾을 수 없습니다.');
            break;
          default:
            break;
        }
      }

      console.error(error);
    }
  }, [checkLogin, productId]);

  const handleSubmitClick = useCallback(() => {
    checkLogin();

    const productHistoryData: OrderHistoryData = {
      productId,
      productQuantity: count,
    };

    orderHistoryStorage.set(productHistoryData);

    navigate(Paths.PRODUCT_ORDER);
  }, [checkLogin, productId, count, navigate]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setCount(0);

        return;
      }

      setCount(parseInt(e.target.value, 10));
    },
    [setCount],
  );

  return (

    <Container
      flexDirection="column"
      elementSize={{
        width: '100%',
        height: '100%',
      }}
      maxWidth="360px"
      justifyContent="space-between"
      padding="30px 12px 30px 30px"
    >
      <Container>
        <Box
          w="100%"
          padding="12px 14px 16px"
          border="rgb(237, 237, 237) 1px solid"
          display="flex"
          flexDirection="column"
        >
          <Text fontWeight="bold">{productName}</Text>
          <HStack w="100%" paddingTop="10px">
            <Button {...getDecrementButtonProps()}>-</Button>
            <Input
              {...getInputProps()}
              borderColor={defaultBorderColor}
              onChange={handleInputChange}
              value={count}
            />
            <Button {...getIncrementButtonProps()}>+</Button>
          </HStack>
        </Box>
      </Container>
      <Container flexDirection="column" cssProps={{ gap: '16px' }}>
        <Box
          w="100%"
          padding="18px 20px"
          backgroundColor={backgroundColors.root}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>총 결제 금액</Text>
          <Text fontWeight="bold" fontSize="lg">
            {productPrice * count}
            원
          </Text>
        </Box>
        <DefaultButton
          theme="kakao"
          text="관심 선물에 등록하기"
          elementSize="big"
          style={{
            fontSize: '15px',
          }}
          onClick={handleAddWishClick}
        />
        <DefaultButton
          theme="black"
          text="나에게 선물하기"
          elementSize="big"
          style={{
            fontSize: '15px',
          }}
          onClick={handleSubmitClick}
        />
      </Container>
    </Container>
  );
}

export default ProductCounterForm;
