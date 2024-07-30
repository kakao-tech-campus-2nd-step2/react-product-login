import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

import { OptionSection } from './OptionSection';

jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));

const mockUseGetProductDetail = useGetProductDetail as jest.Mock;

describe('OptionSection', () => {
  beforeEach(() => {
    mockUseGetProductDetail.mockReturnValue({
      data: { price: 100 },
    });
  });

  test('총 결제 금액 초기값 (수량 1개일 때)', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <OptionSection productId="1" />
      </Suspense>,
    );

    const totalPriceElement = screen.getByText(/총 결제 금액/);

    expect(totalPriceElement).toHaveTextContent('총 결제 금액 100원');
  });

  test('CountOptionItem의 값 변경에 따라 총 결제 금액 업데이트', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <OptionSection productId="1" />
      </Suspense>,
    );

    const input = screen.getByRole('spinbutton');
    const totalPriceElement = screen.getByText(/총 결제 금액/);

    expect(totalPriceElement).toHaveTextContent('총 결제 금액 100원');

    act(() => {
      userEvent.clear(input);
      userEvent.type(input, '2');
    });

    await waitFor(() => expect(totalPriceElement).toHaveTextContent('총 결제 금액 200원'));
  });
});
