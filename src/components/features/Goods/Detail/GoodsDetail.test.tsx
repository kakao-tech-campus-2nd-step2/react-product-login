import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import { GoodsDetail } from './index'; 
describe('GoodsDetail 컴포넌트 통합 테스트', () => {
  test('상품 상세 정보가 올바르게 표시되어야 합니다', async () => {
    // Given: GoodsDetail 컴포넌트가 렌더링되었을 때
    render(<GoodsDetail productId="1" />); 

    // When: 컴포넌트가 화면에 표시되었을 때
    const productName = await screen.findByText('상품 이름');
    const productPrice = await screen.findByText('10000원');
    const productNotice = await screen.findByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!');
    const productImage = screen.getByAltText('상품 이름');

    // Then: 상품 이름, 가격, 알림 메시지, 이미지가 올바르게 표시되어야 합니다
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productNotice).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});
