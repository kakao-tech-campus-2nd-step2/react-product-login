import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CountOptionItem } from './CountOptionItem';

describe('CountOptionItem', () => {
  const setup = (value = '1') => {
    const onChange = jest.fn();

    render(<CountOptionItem name="Test Item" value={value} onChange={onChange} />);

    const incrementButton = screen.getByLabelText('수량 1개 추가');
    const decrementButton = screen.getByLabelText('수량 1개 감소');
    const input = screen.getByRole('spinbutton');

    return { incrementButton, decrementButton, input, onChange };
  };

  test('컴포넌트 초기값으로 렌더링', () => {
    const { input } = setup();
    expect(input).toHaveValue('1');
  });

  test('증가 버튼을 클릭 시 값이 증가', async () => {
    const { incrementButton, input, onChange } = setup();
    userEvent.click(incrementButton);
    await waitFor(() => expect(input).toHaveValue('2'));
    expect(onChange).toHaveBeenCalledWith('2');
  });

  test('감소 버튼을 클릭 시 값이 감소', async () => {
    const { decrementButton, input, onChange } = setup('2');
    userEvent.click(decrementButton);
    await waitFor(() => expect(input).toHaveValue('1'));
    expect(onChange).toHaveBeenCalledWith('1');
  });

  test('최소값보다 감소 X', async () => {
    const { decrementButton, input, onChange } = setup();
    userEvent.click(decrementButton);
    await waitFor(() => expect(input).toHaveValue('1'));
    expect(onChange).not.toHaveBeenCalled();
  });

  test('최대값보다 증가 X', async () => {
    const { incrementButton, input, onChange } = setup('100');
    userEvent.click(incrementButton);
    await waitFor(() => expect(input).toHaveValue('100'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
