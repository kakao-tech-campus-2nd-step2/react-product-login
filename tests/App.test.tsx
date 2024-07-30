import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { FormProvider, useForm } from 'react-hook-form';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import type { Props } from '@/components/features/Home/CategorySection/CategoryItem';
import { CategoryItem } from '@/components/features/Home/CategorySection/CategoryItem';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
// import { OrderFormOrderInfo } from '@/components/features/Order/OrderForm/OrderInfo';
import { Sum } from '@/Sum';
import type { OrderFormData, OrderHistory } from '@/types';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
});

describe('useGetCategorys 카테고리 렌더링 테스트', () => {
  const testProps: Props = {
    image: '',
    label: '라벨',
  };
  test('카테고리섹션이 렌더링 되는지', () => {
    render(<CategoryItem {...testProps} />);
    expect(screen.getByText(testProps.label)).toBeInTheDocument();
  });
});

describe('통합테스트', () => {
  const queryClient = new QueryClient();
  const testOrderHistory: OrderHistory = {
    id: 3245119,
    count: 2,
  };
  test('현금영수증 checkbox가 false인 경우 현금영수증 종류 및 번호 필드 비활성화', () => {
    const { id, count } = testOrderHistory;

    const { result } = renderHook(() =>
      useForm<OrderFormData>({
        defaultValues: {
          productId: id,
          productQuantity: count,
          senderId: 0,
          receiverId: 0,
          hasCashReceipt: false,
        },
      }),
    );
    act(() => {
      expect(result.current).toBeDefined();
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <form action="">
            <CashReceiptFields />
          </form>
        </FormProvider>
      </QueryClientProvider>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptType = screen.getByRole('combobox');
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    // 체크박스 클릭 X => 현금영수증 신청 X
    expect(checkbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();

    // 체크박스 클릭 => 현금영수증 신청 O
    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();

    // 체크박스 다시 클릭 => 현금영수증 신청 X
    userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();
  });

  test('form validation', async () => {
    const { id, count } = testOrderHistory;

    const { result } = renderHook(() =>
      useForm<OrderFormData>({
        defaultValues: {
          productId: id,
          productQuantity: count,
          senderId: 0,
          receiverId: 0,
          hasCashReceipt: false,
        },
      }),
    );
    expect(result.current).toBeDefined();

    const testWorker = setupServer(...categoriesMockHandler, ...productsMockHandler);
    await testWorker.listen();
    render(
      <QueryClientProvider client={queryClient}>
        <OrderForm orderHistory={{ ...testOrderHistory }} />
      </QueryClientProvider>,
    );
    const submitBtn = await screen.findByLabelText('submitBtn');
    await userEvent.click(submitBtn);
    window.alert = jest.fn();
    await waitFor(() => {
      expect(window.alert).toBeCalledWith('메시지를 입력해주세요.');
    });
  });
});
