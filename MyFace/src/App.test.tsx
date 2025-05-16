import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

beforeAll(async () => {
  "use strict";
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
});

test('renders Home Page text', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Home Page/i);
  expect(textElement).toBeVisible();
});