import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Paths from '@constants/Paths';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import ProductMessageForm from '@components/organisms/product/ProductMessageForm';
import ProductOrderHistorySection from '@components/organisms/product/ProductOrderHistorySection';
import ProductOrderForm from '@components/organisms/product/ProductOrderForm';
import useOrderFormValidation from '@hooks/useOrderFormValidation';
import { ProductOrderPageState } from '@/types';
import { OrderRequestBody } from '@/types/request';
import { CashReceiptOptions } from '@/constants';
import { isEmptyString, isNumericString } from '@/utils';

function ProductOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [location.state, navigate]);

  const state = location.state as ProductOrderPageState;
  const { count, productDetails: product } = state;

  const [orderData, setOrderData] = useState<OrderRequestBody>({
    productId: product.id,
    productOptionId: 1,
    productQuantity: count,
    messageCardTemplateId: 0,
    messageCardTextMessage: '',
    senderId: 0,
    receiverId: 0,
    hasCashReceipt: false,
    cashReceiptType: CashReceiptOptions.PERSONAL,
    cashReceiptNumber: '',
  });
  const {
    errorStatus, validateForm,
  } = useOrderFormValidation({ orderData });

  const handleSubmit = useCallback(() => {
    if (isEmptyString(orderData.messageCardTextMessage)
      || (orderData.hasCashReceipt && !isNumericString(orderData.cashReceiptNumber as string))) {
      validateForm();

      return;
    }

    alert('주문이 완료되었습니다.');
  }, [orderData, validateForm]);

  return (
    <Page>
      <Container
        elementSize={{
          width: '100%',
          height: '100vh',
        }}
        justifyContent="center"
      >
        <Container
          elementSize="full-width"
          maxWidth="1280px"
          cssProps={{
            borderLeft: `1px solid ${defaultBorderColor}`,
            borderRight: `1px solid ${defaultBorderColor}`,
          }}
        >
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            padding="44px 0px 32px"
          >
            <ProductMessageForm
              orderData={orderData}
              setOrderData={setOrderData}
              errorStatus={errorStatus}
            />
            <ProductOrderHistorySection productDetails={product} count={count} />
          </Container>
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            maxWidth="360px"
          >
            <ProductOrderForm
              productDetails={product}
              orderData={orderData}
              setOrderData={setOrderData}
              errorStatus={errorStatus}
              handleSubmit={handleSubmit}
            />
          </Container>
        </Container>
      </Container>
    </Page>
  );
}

export default ProductOrderPage;
