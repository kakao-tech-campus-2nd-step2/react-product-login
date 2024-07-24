// OptionSection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { OptionSection } from './OptionSection';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock hooks
jest.mock('@/api/hooks/useGetProductDetail');
jest.mock('@/api/hooks/useGetProductOptions');
jest.mock('@/provider/Auth');

const mockUseGetProductDetail = useGetProductDetail as jest.Mock;
const mockUseGetProductOptions = useGetProductOptions as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe('OptionSection', () => {
    beforeEach(() => {
        mockUseGetProductDetail.mockReturnValue({
            data: { price: 10000 },
        });
        mockUseGetProductOptions.mockReturnValue({
            data: [{ name: '옵션1' }],
        });
        mockUseAuth.mockReturnValue(true); // 로그인 상태로 가정
    });

    it('should render product details and options', () => {
        render(
            <Router>
                <OptionSection productId="1" />
            </Router>
        );

        expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
        expect(screen.getByText('옵션1')).toBeInTheDocument();
    });

    it('should update total price when count changes', () => {
        render(
            <Router>
                <OptionSection productId="1" />
            </Router>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '2' } });

        expect(screen.getByText('총 결제 금액')).toHaveTextContent('20000원');
    });

    it('should navigate to login if not authenticated', () => {
        mockUseAuth.mockReturnValue(false); // 비로그인 상태로 가정

        render(
            <Router>
                <OptionSection productId="1" />
            </Router>
        );

        const button = screen.getByRole('button', { name: /나에게 선물하기/i });
        fireEvent.click(button);

        expect(window.confirm).toHaveBeenCalledWith(
            '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'
        );
    });
});
