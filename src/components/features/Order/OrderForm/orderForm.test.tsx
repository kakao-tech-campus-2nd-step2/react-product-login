import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { OrderForm } from '@/components/features/Order/OrderForm';

describe('OrderForm', () => {
  test('현금영수증 Checkbox가 false인 경우 관련 필드가 비활성화 되어있는지 확인', () => {
    render(<OrderForm orderHistory={{ id: 1, count: 2 }} />);

    const checkbox = screen.getByLabelText(/현금영수증 신청/i);
    const receiptTypeSelect = screen.getByRole('combobox', { name: /현금영수증 종류/i });
    const receiptNumberInput = screen.getByPlaceholderText(/숫자만 입력해주세요/i);

    expect(checkbox).not.toBeChecked();
    expect(receiptTypeSelect).toBeDisabled();
    expect(receiptNumberInput).toBeDisabled();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(receiptTypeSelect).toBeEnabled();
    expect(receiptNumberInput).toBeEnabled();
  });

  test('현금영수증 Checkbox가 true인 경우 관련 필드에 값이 입력되는지 확인', async () => {
    render(<OrderForm orderHistory={{ id: 1, count: 2 }} />);

    const checkbox = screen.getByLabelText(/현금영수증 신청/i);
    fireEvent.click(checkbox);

    const receiptTypeSelect = screen.getByRole('combobox', { name: /현금영수증 종류/i });
    const receiptNumberInput = screen.getByPlaceholderText(/숫자만 입력해주세요/i);

    fireEvent.change(receiptTypeSelect, { target: { value: 'PERSONAL' } });
    fireEvent.change(receiptNumberInput, { target: { value: '1234567890' } });

    expect(receiptTypeSelect).toHaveValue('PERSONAL');
    expect(receiptNumberInput).toHaveValue('1234567890');
  });

  test('form의 validation 로직이 정상 동작하는지 확인', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<OrderForm orderHistory={{ id: 1, count: 2 }} />);

    const submitButton = screen.getByRole('button', { name: /주문하기/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });

    const messageInput = screen.getByPlaceholderText(/메시지를 입력해 주세요/i);
    fireEvent.change(messageInput, { target: { value: 'a'.repeat(101) } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });

    const checkbox = screen.getByLabelText(/현금영수증 신청/i);
    fireEvent.click(checkbox);
    fireEvent.change(messageInput, { target: { value: 'Valid message' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });

    const receiptNumberInput = screen.getByPlaceholderText(/숫자만 입력해주세요/i);
    fireEvent.change(receiptNumberInput, { target: { value: 'abc123' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });

    fireEvent.change(receiptNumberInput, { target: { value: '1234567890' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });

    alertMock.mockRestore();
  });
});
