import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';

import { SelectFriendsBanner } from './index';
describe('SelectFriendsBanner Component', () => {
  test('이미지 클릭시 alert 뜨는지', () => {
    window.alert = jest.fn();

    render(<SelectFriendsBanner />);

    const img = screen.getByAltText('친구 선택 유도 아이콘');
    fireEvent.click(img);

    expect(window.alert).toHaveBeenCalledWith('선물 받을 친구 선택하기');
  });
});
