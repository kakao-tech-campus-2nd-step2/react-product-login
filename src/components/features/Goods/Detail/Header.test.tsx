import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { GoodsDetailHeader } from './Header';

test('productId에 맞는 상품 정보 렌더링 확인', async () => {
    render(
        <QueryClientProvider client={new QueryClient()}> // QueryClientProvider로 감싸서 렌더링
            <GoodsDetailHeader productId="3245119" /> // productId를 3245119로 설정하여 전달
        </QueryClientProvider>,
    );
    await waitFor(() => { // 비동기 대기
        expect( //  화면에 특정 텍스트가 표시되는지 검증
            screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'), // 텍스트 노드를 검색
        ).toBeInTheDocument(); // 해당 텍스트가 DOM에 존재하는지 확인
        expect(screen.getByText('145000원')).toBeInTheDocument(); // 상품 가격 확인
        expect( // 문구 확인
            screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!'),
        ).toBeInTheDocument();
    });
});