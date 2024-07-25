import '@testing-library/jest-dom';

import { worker } from './browser';

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
