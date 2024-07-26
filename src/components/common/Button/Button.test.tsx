import { fireEvent,render, screen } from '@testing-library/react';

import { Button } from './index';

describe('Button 컴포넌트', () => {
  test('버튼이 렌더링되었을 때, 올바른 텍스트를 가지고 있어야 합니다', () => {
    // Given: Button 컴포넌트가 렌더링되었을 때
    render(<Button>Click Me</Button>);

    // When: 컴포넌트가 화면에 표시되었을 때
    const buttonElement = screen.getByText(/Click Me/i);

    // Then: 버튼 텍스트가 올바르게 표시되어야 합니다
    expect(buttonElement).toBeInTheDocument();
  });

  test('버튼에 onClick 핸들러가 있을 때, 클릭 시 핸들러가 호출되어야 합니다', () => {
    // Given: onClick 핸들러가 있는 Button 컴포넌트가 렌더링되었을 때
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    // When: 버튼이 클릭되었을 때
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    // Then: onClick 핸들러가 호출되어야 합니다
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
