import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Menu from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render menu', () => {
  render(<Menu />);

  expect(screen.getByRole('titleCardapio')).toHaveTextContent(/Cardápio/);
});
