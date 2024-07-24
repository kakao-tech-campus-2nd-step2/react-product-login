import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { CountOptionItem } from './CountOptionItem';

const CountOptionComponent = () => {
  const [countAsString, setCountAsString] = useState('1');
  return <CountOptionItem name="수량" value={countAsString} onChange={setCountAsString} />;
};

test('CountOptionItem count up', () => {
  render(<CountOptionComponent />);
  const inputBox = screen.getByRole('spinbutton');
  fireEvent.click(screen.getByLabelText('수량 1개 추가'));
  fireEvent.click(screen.getByLabelText('수량 1개 추가'));
  expect(inputBox).toHaveValue('3');
});
