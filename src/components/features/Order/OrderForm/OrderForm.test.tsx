import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { OrderHistory } from '@/types';

import { OrderForm } from './index';

const mockOrderHistory: OrderHistory = {
  id: 3145119,
  count: 1,
};

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('OrderForm', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('올바른 데이터를 submit 한 경우', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: 'Valid message' },
    });
    fireEvent.click(screen.getByLabelText('현금영수증 신청'));
    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
      target: { value: '1234567890' },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });
  });

  it('현금 영수증 번호가 숫자가 아닌 경우 경고 표시', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());

    fireEvent.click(screen.getByLabelText('현금영수증 신청'));
    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
      target: { value: '숫자' },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  it('현금 영수증 번호가 입력되지 않은 경우', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  it('메시지 길이가 100자를 넘어간 경우', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: '메세지'.repeat(35) },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });

  it('메시지를 입력하지 않은 경우', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  it('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());

    const cashReceiptCheckbox = screen.getByRole('checkbox', { name: '현금영수증 신청' });
    const cashReceiptType = screen.getByRole('combobox', { name: '현금영수증 종류' });
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();
  });

  it('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 하는지 확인', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>
    );

    await waitFor(() => expect(screen.getByRole('form')).toBeInTheDocument());

    const cashReceiptCheckbox = screen.getByRole('checkbox', { name: '현금영수증 신청' });
    fireEvent.click(cashReceiptCheckbox);

    const cashReceiptType = screen.getByRole('combobox', { name: '현금영수증 종류' });
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).toBeChecked();
    expect(cashReceiptType).not.toBeDisabled();
    expect(cashReceiptNumber).not.toBeDisabled();
  });
});
