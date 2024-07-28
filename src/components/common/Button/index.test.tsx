import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from './index';

test('버튼 렌더링과 클릭 테스트', () => {
  const mockClickHandler = jest.fn();
  const buttonText = 'Click';

  render(
    <Button onClick={mockClickHandler} data-testid="custom-button">
      {buttonText}
    </Button>,
  );
  const buttonElement = screen.getByTestId('custom-button');
  fireEvent.click(buttonElement);

  expect(buttonElement).toBeInTheDocument();
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
