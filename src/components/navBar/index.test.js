import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import MyNavBar from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render navBar', () => {
  render(<MyNavBar />);

  expect(screen.getByRole('title')).toHaveTextContent(/X Burger/);
  expect(screen.getByRole('clientes')).toHaveTextContent(/Clientes/);
  expect(screen.getByRole('login')).toHaveTextContent(/Login/);
  expect(screen.getByRole('pedidos')).toHaveTextContent(/Pedidos/);
  expect(screen.getByRole('cardápio')).toHaveTextContent(/Cardápio/);
  expect(screen.getByRole('estoque')).toHaveTextContent(/Estoque/);
  expect(screen.getByRole('garçons')).toHaveTextContent(/Garçons/);
});
