import '@testing-library/jest-dom';

import { worker } from './mocks/browser';

// 서비스 워커 시작
beforeAll(() => worker.start());

// 각 테스트 후 핸들러 리셋
afterEach(() => worker.resetHandlers());

// 모든 테스트가 끝난 후 서비스 워커 중지
afterAll(() => worker.stop());
