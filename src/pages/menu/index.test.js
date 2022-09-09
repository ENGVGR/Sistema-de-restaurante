import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Menu from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render navBar', () => {
  render(<Menu />);

  expect(screen.getByRole('title')).toHaveTextContent(/Cardápio/);
  expect(screen.getByRole('name')).toHaveTextContent(/X Burguer/);
});
