import { render, screen } from '@testing-library/react';

import { DefaultGoodsItems } from './Default';

describe('DefaultGoodsItems 컴포넌트', () => {
  test('상품 아이템이 렌더링되었을 때, 올바른 이름, 서브타이틀, 금액을 가지고 있어야 합니다', () => {
    // Given: DefaultGoodsItems 컴포넌트가 렌더링되었을 때/
    render(<DefaultGoodsItems imageSrc="image.jpg" subtitle="Subtitle" title="Title" amount={1000} />);

    // When: 컴포넌트가 화면에 표시되었을 때
    const titleElement = screen.getByText(/Title/i);
    const subtitleElement = screen.getByText(/Subtitle/i);
    const amountElement = screen.getByText(/1000원/i);

    // Then: 이름, 서브타이틀, 금액이 올바르게 표시되어야 합니다
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
  });
});
