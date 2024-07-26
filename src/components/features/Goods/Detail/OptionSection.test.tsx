import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { CountOptionItem } from './OptionItem/CountOptionItem';

test('- 버튼 클릭시 수량 감소', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CountOptionItem name="optionA" value="1" onChange={() => {}} />
    </QueryClientProvider>,
  );
  const decreaseButton = screen.getByLabelText('수량 1개 감소');
  const input = screen.findByTestId('수량');
  fireEvent.click(decreaseButton);
  expect(input).toBe('0');
});
