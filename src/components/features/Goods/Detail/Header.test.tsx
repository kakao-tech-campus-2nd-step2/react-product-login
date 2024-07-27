import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';

test('productId에 맞는 상품 정보 렌더링 확인', async () => {
    render(
        <QueryClientProvider client={new QueryClient()}>
            <GoodsDetailHeader productId="3245119" />
        </QueryClientProvider>,
    );
    await waitFor(() => {
        expect(
            screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
        ).toBeInTheDocument();
        expect(screen.getByText('145000원')).toBeInTheDocument();
        expect(
            screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!'),
        ).toBeInTheDocument();
    });
});