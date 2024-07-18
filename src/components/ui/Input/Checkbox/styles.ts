import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const checkboxStyle = css({
  // 기본 checkbox ui 숨기기
  '&:not(:checked), &:checked': {
    position: 'absolute',
    width: 'fit-content',
    opacity: 0,
  },
  // label에 체크박스 영역 설정
  '+ label': {
    position: 'relative',
    paddingLeft: '2.5em',
    lineHeight: 1.7,
    cursor: 'pointer',
  },
  // label 앞에 checkbox ui 그리기 - 체크 전
  '+ label:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: '1.5em',
    height: '1.5em',
    border: `2px solid ${colors.newGray[200]}`,
    borderRadius: '0.2em',
  },
  // label 앞에 checkbox ui 그리기 - 체크 후
  '&:checked + label::before': {
    content: '"✓"',
    fontWeight: 600,
    lineHeight: 1.4,
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.black,
    backgroundColor: colors.yellow[100],
  },
});
