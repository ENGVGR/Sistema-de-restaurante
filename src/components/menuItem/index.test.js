import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import menuItem from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render navBar', () => {
  render(<menuItem />);

  expect(screen.getByRole('name')).toHaveTextContent(/Nome/);
  expect(screen.getByRole('price')).toHaveTextContent(/Preço/);
  expect(screen.getByRole('quantity')).toHaveTextContent(/Quantidade/);
  expect(screen.getByRole('ingredients')).toHaveTextContent(/Ingredientes/);
  expect(screen.getByRole("image")).toBeInTheDocument();
});
