import React from 'react';

import '@testing-library/jest-dom';

import { server } from './src/mocks/server';

global.React = React;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
