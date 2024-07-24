// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';

// 모든 테스트 전에 API mocking 설정
beforeAll(() => server.listen());

// 각 테스트 후 request 핸들러를 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 후 클린업
afterAll(() => server.close());