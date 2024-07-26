// CountOptionItem.test.tsx
import { fireEvent,render, screen } from '@testing-library/react';

import { CountOptionItem } from './CountOptionItem';

describe('옵션 디테일 선택 확인', () => {
    it('상품 이름과 수량 렌더링 확인', () => {
        render(
            <CountOptionItem name="[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)" value="1" onChange={() => { }} />
        );

        expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    it('input value 변경 시 onChange 호출 확인', () => {
        const handleChange = jest.fn();
        render(
            <CountOptionItem name="[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)" value="1" onChange={handleChange} />
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '2' } });

        expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('수량 추가 및 감소 확인', () => {
        const handleChange = jest.fn();
        render(
            <CountOptionItem name="[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)" value="1" onChange={handleChange} />
        );

        const incrementButton = screen.getByRole('button', { name: /수량 1개 추가/i });
        const decrementButton = screen.getByRole('button', { name: /수량 1개 감소/i });

        fireEvent.click(incrementButton);
        expect(handleChange).toHaveBeenCalledWith('2');

        fireEvent.click(decrementButton);
        expect(handleChange).toHaveBeenCalledWith('1');
    });
});
