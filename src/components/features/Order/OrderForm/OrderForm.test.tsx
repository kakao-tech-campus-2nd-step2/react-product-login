import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { OrderHistory } from '@/types';

import { OrderForm } from '.';

jest.mock('./OrderInfo', () => ({
    OrderFormOrderInfo: jest.fn(() => <div>Order Info Component</div>),
}));
jest.mock('./MessageCard', () => ({
    OrderFormMessageCard: jest.fn(() => <div>Message Card Component</div>),
}));
jest.mock('./GoodsInfo', () => ({
    GoodsInfo: jest.fn(() => <div>Goods Info Component</div>),
}));

describe('OrderForm Integration Test', () => {
    const orderHistory: OrderHistory = {
        id: 3245119,
        count: 1,
    };

    const renderOrderForm = () => {
        render(<OrderForm orderHistory={orderHistory} />);
    };

    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인', () => {
        renderOrderForm();

        const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
        const cashReceiptType = screen.getByRole('combobox');
        const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

        expect(cashReceiptCheckbox).not.toBeChecked();
        expect(cashReceiptType).toBeDisabled();
        expect(cashReceiptNumber).toBeDisabled();
    });

    it('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 하는지 확인', () => {
        renderOrderForm();

        const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
        fireEvent.click(cashReceiptCheckbox);

        const cashReceiptType = screen.getByRole('combobox');
        const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

        expect(cashReceiptCheckbox).toBeChecked();
        expect(cashReceiptType).not.toBeDisabled();
        expect(cashReceiptNumber).not.toBeDisabled();
    });

    it('form의 validation 로직이 정상 동작하는지 확인', async () => {
        renderOrderForm();

        const submitButton = screen.getByRole('button', { name: /제출/i });

        // Submit the form with empty fields to check validation errors
        fireEvent.click(submitButton);

        await screen.findByText('메시지를 입력해주세요.');

        // Fill the message field with an invalid value
        const messageField = screen.getByLabelText('메시지');
        fireEvent.change(messageField, { target: { value: 'a'.repeat(101) } });

        fireEvent.click(submitButton);
        await screen.findByText('메시지는 100자 이내로 입력해주세요.');

        // Fill the form correctly and submit
        fireEvent.change(messageField, { target: { value: '유효한 메시지' } });

        const cashReceiptCheckbox = screen.getByLabelText('현금영수증 발급');
        fireEvent.click(cashReceiptCheckbox);
        const cashReceiptNumber = screen.getByLabelText('현금영수증 번호');
        fireEvent.change(cashReceiptNumber, { target: { value: '1234567890' } });

        fireEvent.click(submitButton);
        await screen.findByText('주문이 완료되었습니다.');
    });

    it('현금영수증 번호에 숫자가 아닌 값 입력 시 에러 메세지 alert 확인', async () => {
        renderOrderForm();

        fireEvent.click(screen.getByLabelText('현금영수증 신청'));
        fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
            target: { value: '숫자' },
        });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
        });
    });

    test('현금영수증 번호를 미입력시 에러 메세지 alert 확인F', async () => {
        renderOrderForm();

        const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;

        fireEvent.click(cashReceiptCheckbox);

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
        });
    });

    it('메시지가 100자를 초과 시 에러 메세지 확인', async () => {
        renderOrderForm();

        fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
            target: { value: '메세지'.repeat(35) },
        });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
        });
    });

    it('메시지를 미입력시 에러 메세지 alert.', async () => {
        renderOrderForm();

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
        });
    });
});
