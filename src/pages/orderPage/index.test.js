import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import OrderPage from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render stock', () => {
  render(<OrderPage/>);

  expect(screen.getByRole('titleOrder')).toHaveTextContent('Pedidos');
  expect(screen.getByRole('subtitleOrder')).toHaveTextContent(
    'Adicionar novo item'
  );
  expect(screen.getByRole('collumNameOrder')).toHaveTextContent(
    'Garçom',
    'Mesa',
    'Pedido',
    'Status',
    'ações'
  );
  expect(screen.getByRole('buttonNameOrder')).toHaveTextContent('Adicionar');
});
