import { css } from '@emotion/react';
import { defaultBorderColor } from '@styles/colors';
import Container from '@components/atoms/container/Container';
import ProductMessageForm from '@components/organisms/product/ProductMessageForm';
import ProductOrderHistorySection from '@components/organisms/product/ProductOrderHistorySection';
import ProductReceiptForm from '@components/organisms/product/ProductReceiptForm';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { fetchProductDetail } from '@utils/query';
import { useNavigate } from 'react-router-dom';
import Paths from '@constants/Paths';
import { OrderRequestBody } from '@/types/request';
import { OrderFormData, OrderHistoryData } from '@/types';
import { CashReceiptOptions } from '@/constants';
import { ProductDetailData } from '@/dto';

interface ProductOrderFormProps {
  orderHistory: OrderHistoryData;
}

function ProductOrderForm({ orderHistory }: ProductOrderFormProps) {
  const {
    data: product,
  } = useSuspenseQuery<ProductDetailData>({
    queryKey: [QueryKeys.PRODUCT_DETAILS, orderHistory.productId],
    queryFn: () => fetchProductDetail({ productId: orderHistory.productId.toString() }),
  });
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
    watch,
  } = useForm<OrderFormData>({
    mode: 'onChange',
    defaultValues: {
      messageCardTextMessage: '',
      hasCashReceipt: false,
      cashReceiptType: CashReceiptOptions.PERSONAL,
      cashReceiptNumber: '',
    },
  });

  const onSubmit = useCallback(async (data: OrderFormData) => {
    if (!orderHistory) return;

    const orderBody: OrderRequestBody = {
      productId: orderHistory.productId,
      productOptionId: 1,
      productQuantity: orderHistory.productQuantity,
      messageCardTemplateId: 0,
      messageCardTextMessage: data.messageCardTextMessage,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: data.hasCashReceipt,
      cashReceiptType: data.cashReceiptType,
      cashReceiptNumber: data.cashReceiptNumber,
    };
    alert(`${orderBody.productId}번 상품의 주문이 완료되었습니다.`);
  }, [orderHistory]);

  useEffect(() => {
    if (!product) navigate(Paths.MAIN_PAGE);
  }, [product, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        width: 100%;
        max-width: 1280px;
        border-right: 1px solid ${defaultBorderColor};
        border-left: 1px solid ${defaultBorderColor};
      `}
    >
      <Container
        elementSize="full-width"
        alignItems="center"
        flexDirection="column"
        padding="44px 0px 32px"
      >
        <ProductMessageForm
          register={register}
          errors={errors}
        />
        <ProductOrderHistorySection productDetails={product} count={orderHistory.productQuantity} />
      </Container>
      <Container
        elementSize="full-width"
        alignItems="center"
        flexDirection="column"
        maxWidth="360px"
      >
        <ProductReceiptForm
          productDetails={product}
          count={orderHistory.productQuantity}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          control={control}
          watch={watch}
        />
      </Container>
    </form>
  );
}

export default ProductOrderForm;
