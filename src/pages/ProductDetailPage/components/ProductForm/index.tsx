import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { ProductDetailRequestParams } from '@/api/services/productDetail';
import { useTotalPrice } from '@/pages/ProductDetailPage/hooks/useTotalPrice';
import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Button } from '@/components/ui/Button';
import { Confirm } from '@/components/ui/Dialog/Confirm';
import { Container } from '@/components/ui/Layout/Container';

import { QuantityInput } from './QuantityInput';
import { TotalPriceCallout } from './TotalPriceCallout';
import { containerStyle } from './style';

type ProductFormProps = ProductDetailRequestParams;

export const ProductForm = ({ productId }: ProductFormProps) => {
  const { data, error } = useProductDetail({ productId });
  const { totalPrice, quantity, updateQuantity } = useTotalPrice(productId);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  const onClick = () => {
    if (!isLoggedIn) {
      onOpen();
      return;
    }

    const state = {
      productId,
      quantity,
    };

    navigate(ROUTER_PATH.ORDER, { state });
  };

  return (
    <Container
      flexDirection="column"
      justifyContent="space-between"
      css={containerStyle}
    >
      <QuantityInput
        productDetail={data}
        quantity={quantity}
        onChangeQuantity={updateQuantity}
      />
      <Container flexDirection="column" gap="1rem">
        <TotalPriceCallout totalPrice={totalPrice} />
        <Button
          theme="black"
          size="large"
          onClick={onClick}
          css={{ height: '3.5rem' }}
        >
          나에게 선물하기
        </Button>
        <Confirm
          message={`로그인이 필요한 메뉴입니다.
            로그인 페이지로 이동하시겠습니까?`}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={() => navigate(ROUTER_PATH.LOGIN)}
        />
      </Container>
    </Container>
  );
};
