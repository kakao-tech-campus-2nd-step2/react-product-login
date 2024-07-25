import { render, screen, fireEvent } from '@testing-library/react';
import { OptionSection } from './OptionSection';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import { BrowserRouter as Router } from 'react-router-dom';

// 모킹(Mocking) : 테스트 환경에서 실제 훅을 사용하지 않고, 필요한 데이터를 반환하도록 설정
jest.mock('@/api/hooks/useGetProductDetail');
jest.mock('@/api/hooks/useGetProductOptions');
jest.mock('@/provider/Auth');

const mockUseGetProductDetail = useGetProductDetail as jest.Mock;
const mockUseGetProductOptions = useGetProductOptions as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe('옵션 선택 확인', () => { // 테스트를 그룹화
    beforeEach(() => { // beforeEach는 각 테스트가 실행되기 전에 실행, 모킹된 훅이 반환하는 데이터를 설정
        mockUseGetProductDetail.mockReturnValue({
            data: { price: 12000 },
        });
        mockUseGetProductOptions.mockReturnValue({
            data: [{ name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)' }],
        });
        mockUseAuth.mockReturnValue(true); // 로그인 상태로 가정
    });

    it('productDetail과 productOptions의 렌더링 확인', () => {
        render(
            <Router>
                <OptionSection productId="3245119" />
            </Router>
        );

        expect(screen.getByText('총 결제 금액 12000원')).toBeInTheDocument();
        expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
    });

    it('count 변경 시 totalPrice 변경 확인', async () => {
        render(
            <Router>
                <OptionSection productId="3245119" />
            </Router>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '2' } });

        expect(screen.getByText('총 결제 금액')).toHaveTextContent('24000원');
    });

    it('비로그인시, 버튼 클릭 후 alert 및 navigate 확인', async () => {
        mockUseAuth.mockReturnValue(false); // 비로그인 상태로 가정

        render(
            <Router>
                <OptionSection productId="3245119" />
            </Router>
        );

        const button = screen.getByRole('button', { name: /나에게 선물하기/i });
        fireEvent.click(button);

        expect(window.confirm).toHaveBeenCalledWith(
            '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'
        );
    });
});
