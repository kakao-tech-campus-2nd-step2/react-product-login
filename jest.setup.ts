import React from 'react';

import '@testing-library/jest-dom';
import dotenv from 'dotenv';

import { server } from './src/mocks/server';

dotenv.config({ path: '.env.test' });
global.React = React;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
