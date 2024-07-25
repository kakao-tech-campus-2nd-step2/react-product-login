import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CashReceiptFields } from './CashReceiptFields';

describe('CashReceiptFields', () => {
  test('현금영수증 관련 입력 컴포넌트 렌더링 확인', () => {
    render(<CashReceiptFields />);

    // 컴포넌트 존재 여부 확인
    const checkbox = screen.getByRole('checkbox', { name: '현금영수증 신청' });
    const select = screen.getByRole('combobox', { name: 'cashReceiptType' });
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(checkbox).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('현금영수증 신청 및 입력 테스트', async () => {
    render(<CashReceiptFields />);

    const checkbox = screen.getByRole('checkbox', { name: '현금영수증 신청' });
    const select = screen.getByRole('combobox', { name: 'cashReceiptType' });
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    // 체크박스 클릭
    await userEvent.click(checkbox);

    // 옵션 선택
    await userEvent.selectOptions(select, 'BUSINESS');

    // 입력창에 값 입력
    await userEvent.type(input, '1234567890');

    // 입력값 확인 (react-hook-form 연동 테스트는 별도로 필요)
    expect(input).toHaveValue('1234567890');
  });
});
