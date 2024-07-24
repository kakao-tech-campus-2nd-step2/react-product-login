import '@testing-library/jest-dom';

import { server } from './mocks/server';

// 테스트 전에 서버를 시작
beforeAll(() => server.listen());

// 각 테스트 후 핸들러를 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 후 서버를 닫음.
afterAll(() => server.close());
