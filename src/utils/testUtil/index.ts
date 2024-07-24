// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, afterEach, beforeAll } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import handlers from '@/mock';

export default function setupMockBeforeTest() {
  const mockServer = setupServer(...handlers);
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());
}
