import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import LoginPage from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render LoginPage', () => {
  render(<LoginPage />);

  expect(screen.getByRole('image')).toHaveTextContent(/image/);
  expect(screen.getByRole('card')).toHaveTextContent(/card/);
});
