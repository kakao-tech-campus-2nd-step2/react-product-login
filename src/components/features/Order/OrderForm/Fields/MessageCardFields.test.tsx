import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageCardFields } from './MessageCardFields';

describe('MessageCardFields', () => {
  test('메시지 카드 입력 컴포넌트 렌더링 확인', () => {
    render(<MessageCardFields />);

    const textarea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    expect(textarea).toBeInTheDocument();
  });

  test('메시지 카드 입력 테스트', async () => {
    render(<MessageCardFields />);

    const textarea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    const message = '축하합니다! 좋은 하루 보내세요.';

    await userEvent.type(textarea, message);

    // 입력값 확인 (react-hook-form 연동 테스트는 별도로 필요)
    expect(textarea).toHaveValue(message);
  });
});
