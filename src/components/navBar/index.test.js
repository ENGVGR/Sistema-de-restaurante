import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './index';

test('render navBar', () => {
  render(<NavBar />);

  expect(screen.getByRole('Navbar.Brand')).toHaveTextContent(/X Burger/);
  expect(screen.getByRole('Navbar.Link')).toHaveTextContent(/Clientes/);
  expect(screen.getByRole('Navbar.Link')).toHaveTextContent(/Pedidos/);
  expect(screen.getByRole('Navbar.Link')).toHaveTextContent(/Cardápio/);
  expect(screen.getByRole('Navbar.Link')).toHaveTextContent(/Estoque/);
  expect(screen.getByRole('Navbar.Link')).toHaveTextContent(/Garçons/);
});
