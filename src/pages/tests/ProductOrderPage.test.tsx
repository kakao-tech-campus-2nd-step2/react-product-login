import {
  render, screen,
} from '@testing-library/react';
import {
  describe, expect, it, vi,
} from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import fireEvent from '@testing-library/user-event';
import ProductOrderForm from '@components/organisms/product/ProductOrderForm';
import TestIds from '@constants/TestIds';
import setupMockBeforeTest from '@utils/testUtil';
import { ContextWrapper, RouterWrapper } from '@utils/testUtil/TestWrapper';
import { FormErrorMessages } from '@constants/ErrorMessage';
import { OrderHistoryData } from '@/types';

const mockOrderHistory: OrderHistoryData = {
  productId: 1,
  productQuantity: 2,
};

vi.mock('@utils/query', () => {
  const mockProductData = {
    id: 3245119,
    name: '[테스트] 상품이름',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: 145000,
  };

  return {
    fetchProductDetail: vi.fn().mockResolvedValue(mockProductData),
  };
});

describe('Product order page', () => {
  setupMockBeforeTest();

  const mockProductData = {
    id: 3245119,
    name: '[테스트] 상품이름',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: 145000,
  };

  const renderComponent = () => render(
    <RouterWrapper>
      <ContextWrapper>
        <ProductOrderForm orderHistory={mockOrderHistory} />
      </ContextWrapper>
    </RouterWrapper>,
  );

  const getOrderInputs = () => {
    const messageInput = screen.getByTestId(TestIds.ID_MESSAGE_CARD);
    const hasCashReceiptCheckbox = screen.getByTestId(TestIds.ID_HAS_RECEIPT);
    const receiptNumber = screen.getByTestId(TestIds.ID_RECEIPT_NUMBER);
    const submitButton = screen.getByTestId(TestIds.ID_SUBMIT_ORDER);

    return {
      messageInput, hasCashReceiptCheckbox, receiptNumber, submitButton,
    };
  };

  it('Order form should be rendered properly', async () => {
    renderComponent();
    expect(await screen.findByText(mockProductData.name)).toBeInTheDocument();
    const { messageInput, hasCashReceiptCheckbox, submitButton } = getOrderInputs();
    expect(messageInput).toBeInTheDocument();
    expect(hasCashReceiptCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Receipt number field should be disabled when hasCashReceipt value is false', async () => {
    renderComponent();
    const { receiptNumber, hasCashReceiptCheckbox } = getOrderInputs();
    expect(receiptNumber).toBeDisabled();
    await fireEvent.click(hasCashReceiptCheckbox);
    expect(receiptNumber).not.toBeDisabled();
  });

  it('Order form validation should be correct', async () => {
    renderComponent();
    const { receiptNumber, hasCashReceiptCheckbox, submitButton } = getOrderInputs();
    await fireEvent.click(submitButton);
    expect(screen.getByText(FormErrorMessages.MESSAGE_CARD_EMPTY)).toBeInTheDocument();
    await fireEvent.click(hasCashReceiptCheckbox);
    await fireEvent.click(submitButton);
    expect(screen.getByText(FormErrorMessages.RECEIPT_NUMBER_REQUIRED))
      .toBeInTheDocument();

    await fireEvent.type(receiptNumber, 'eeeee');
    expect(screen.getByText(FormErrorMessages.RECEIPT_NUMBER_NOT_NUMERIC)).toBeInTheDocument();
  });
});
