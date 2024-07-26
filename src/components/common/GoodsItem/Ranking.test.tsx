import { render, screen } from '@testing-library/react';

import { RankingGoodsItems } from './Ranking';

describe('RankingGoodsItems 컴포넌트', () => {
  test('랭킹 상품 아이템이 렌더링되었을 때, 올바른 랭킹과 이름을 가지고 있어야 합니다', () => {
    // Given: RankingGoodsItems 컴포넌트가 렌더링되었을 때
    render(<RankingGoodsItems rankingIndex={1} imageSrc="image.jpg" subtitle="Subtitle" title="Title" amount={1000} />);

    // When: 컴포넌트가 화면에 표시되었을 때
    const rankingElement = screen.getByText(/1/i);
    const titleElement = screen.getByText(/Title/i);

    // Then: 랭킹과 이름이 올바르게 표시되어야 합니다
    expect(rankingElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
