import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { worker } from '../../mocks/browser'
import { OrderPage } from './index'

beforeAll(() => {
    worker.start()
    worker.use(
        rest.get('src/api/orderHistory', (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ id: 1, count: 2 })
        );
        })
    );
});

test('should render loading view initially', async () => {
  render(<OrderPage />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
});

test('should render order form after loading', async () => {
  render(<OrderPage />);
  await waitFor(() => expect(screen.getByText('주문이 완료되었습니다.')).toBeInTheDocument());
});

test('should disable cash receipt fields when checkbox is unchecked', async () => {
  render(<OrderPage />);
  await waitFor(() => expect(screen.getByText('주문이 완료되었습니다.')).toBeInTheDocument());

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  const cashReceiptNumberField = screen.getByLabelText('숫자만 입력해주세요.');
  expect(cashReceiptNumberField).toBeDisabled();
});

test('should enable cash receipt fields when checkbox is checked', async () => {
  render(<OrderPage />);
  await waitFor(() => expect(screen.getByText('주문이 완료되었습니다.')).toBeInTheDocument());

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);
  fireEvent.click(cashReceiptCheckbox); // toggle to true

  const cashReceiptNumberField = screen.getByLabelText('숫자만 입력해주세요.');
  expect(cashReceiptNumberField).toBeEnabled();
});

test('should validate form correctly', async () => {
  render(<OrderPage />);
  await waitFor(() => expect(screen.getByText('주문이 완료되었습니다.')).toBeInTheDocument());

  const submitButton = screen.getByText('결제하기');
  fireEvent.click(submitButton);

  expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();
});
