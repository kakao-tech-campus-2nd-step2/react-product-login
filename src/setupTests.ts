// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { worker } from './mocks/browser';

beforeAll(() => worker.start());

afterEach(() => worker.resetHandlers());

afterAll(() => worker.stop());
