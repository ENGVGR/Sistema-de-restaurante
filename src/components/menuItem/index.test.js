import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import MenuItem from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render navBar', () => {
  render(<MenuItem />);

  expect(screen.getByRole('name')).toHaveTextContent(/Nome/);
  expect(screen.getByRole('price')).toHaveTextContent(/Preço/);
  expect(screen.getByRole('quantity')).toHaveTextContent(/Quantidade/);
  expect(screen.getByRole('ingredients')).toHaveTextContent(/Ingredientes/);
});
