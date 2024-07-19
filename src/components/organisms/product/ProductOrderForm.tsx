import Container from '@components/atoms/container/Container';
import { defaultBorderColor, textColors } from '@styles/colors';
import {
  Checkbox, Divider, Input, Select, Text,
} from '@chakra-ui/react';
import {
  ChangeEvent, useCallback,
} from 'react';
import Button from '@components/atoms/button/Button';
import { OrderRequestBody } from '@/types/request';
import { ProductDetailData } from '@/dto';
import { CashReceiptOptions } from '@/constants';
import { OrderFormErrorStatus } from '@/types';

interface ProductOrderFormProps {
  productDetails: ProductDetailData;
  orderData: OrderRequestBody;
  setOrderData: (orderData: OrderRequestBody) => void;
  errorStatus: OrderFormErrorStatus;
  handleSubmit: () => void;
}

function InternalFormDivider() {
  return (
    <Divider
      borderBottomColor={defaultBorderColor}
      borderBottomWidth="2px"
      flexDirection="column"
    />
  );
}

function ProductOrderForm({
  productDetails, orderData, setOrderData, errorStatus, handleSubmit,
}: ProductOrderFormProps) {
  const handleDataChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setOrderData({ ...orderData, [name]: value });
  }, [orderData, setOrderData]);

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOrderData({ ...orderData, hasCashReceipt: e.target.checked });
  }, [orderData, setOrderData]);

  const cashReceiptTypeText = {
    [CashReceiptOptions.PERSONAL]: '개인소득공제',
    [CashReceiptOptions.BUSINESS]: '사업자증빙용',
  };
  const finalPrice = productDetails.price.sellingPrice * orderData.productQuantity;

  return (
    <Container
      elementSize={{
        width: '100%',
        height: '100%',
      }}
      padding="16px"
      flexDirection="column"
      cssProps={{
        borderLeft: `1px solid ${defaultBorderColor}`,
      }}
    >
      <Text padding="16px 0" fontWeight="bold">
        결제 정보
      </Text>
      <InternalFormDivider />
      <Container
        elementSize="full-width"
        padding="16px"
        flexDirection="column"
      >
        <Checkbox
          borderColor={defaultBorderColor}
          defaultChecked={orderData.hasCashReceipt}
          onChange={handleCheckboxChange}
        >
          현금영수증 신청
        </Checkbox>
        <Select
          paddingTop="16px"
          onChange={handleDataChange}
          borderColor={defaultBorderColor}
          defaultValue={orderData.cashReceiptType}
          name="cashReceiptType"
        >
          <option value={CashReceiptOptions.PERSONAL}>
            {cashReceiptTypeText[CashReceiptOptions.PERSONAL]}
          </option>
          <option value={CashReceiptOptions.BUSINESS}>
            {cashReceiptTypeText[CashReceiptOptions.BUSINESS]}
          </option>
        </Select>
        <Input
          borderColor={defaultBorderColor}
          marginTop="5px"
          onChange={handleDataChange}
          value={orderData.cashReceiptNumber}
          name="cashReceiptNumber"
          disabled={!orderData.hasCashReceipt}
        />
        {
          errorStatus.hasReceiptError ? (
            <Text color={textColors.error}>{errorStatus.receiptErrorCaption}</Text>
          ) : null
        }
      </Container>
      <InternalFormDivider />
      <Container elementSize="full-width" justifyContent="space-between" padding="16px">
        <Text>최종 결제금액</Text>
        <Text fontWeight="bold">
          {`${finalPrice}원`}
        </Text>
      </Container>
      <InternalFormDivider />

      <Button
        theme="kakao"
        text={`${finalPrice}원 결제하기`}
        elementSize="big"
        style={{
          marginTop: '16px',
        }}
        onClick={handleSubmit}
      />
    </Container>
  );
}

export default ProductOrderForm;
