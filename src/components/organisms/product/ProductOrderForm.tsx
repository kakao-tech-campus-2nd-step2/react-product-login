import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import {
  Checkbox, Divider, Input, Select, Text,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import Button from '@components/atoms/button/Button';
import { OrderRequestBody } from '@/types/request';
import { ProductDetailData } from '@/dto';
import { CashReceiptOptions } from '@/constants';
import { CashReceiptType } from '@/types';

interface ProductOrderFormProps {
  productDetails: ProductDetailData;
  count: number;
  cardMessage: string;
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

function ProductOrderForm({ productDetails, count, cardMessage }: ProductOrderFormProps) {
  const [cashReceiptType, setCashReceiptType] = useState<CashReceiptType>(
    CashReceiptOptions.PERSONAL,
  );

  const [hasCashReceipt, setHasCashReceipt] = useState<boolean>(false);
  const [cashReceiptNumber, setCashReceiptNumber] = useState<string>('');

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCashReceiptType(e.target.value);
  }, [setCashReceiptType]);

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHasCashReceipt(e.target.checked);
  }, [setHasCashReceipt]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCashReceiptNumber(e.target.value);
  }, [setCashReceiptNumber]);

  const handleSubmit = useCallback(() => {
    // @ts-ignore eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body: OrderRequestBody = {
      productId: productDetails.id,
      productQuantity: count,
      productOptionId: 0,
      messageCardTemplateId: 0,
      messageCardTextMessage: cardMessage,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt,
      cashReceiptType,
      cashReceiptNumber,
    };
    // console.log(body);
    alert('주문이 완료되었습니다: ');
  }, [cardMessage, cashReceiptNumber, cashReceiptType, count, hasCashReceipt, productDetails]);

  const cashReceiptTypeText = {
    [CashReceiptOptions.PERSONAL]: '개인소득공제',
    [CashReceiptOptions.BUSINESS]: '사업자증빙용',
  };
  const finalPrice = productDetails.price.sellingPrice * count;

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
          defaultChecked={hasCashReceipt}
          onChange={handleCheckboxChange}
        >
          현금영수증 신청
        </Checkbox>
        <Select
          paddingTop="16px"
          onChange={handleSelectChange}
          borderColor={defaultBorderColor}
          defaultValue={cashReceiptType}
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
          onChange={handleInputChange}
          value={cashReceiptNumber}
        />
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
