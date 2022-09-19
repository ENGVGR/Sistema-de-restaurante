import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import OrderPage from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render stock', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<OrderPage />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('titleOrder')).toHaveTextContent('Pedidos');
  expect(screen.getByRole('subtitleOrder')).toHaveTextContent(
    'Adicionar novo item'
  );
  expect(screen.getByRole('collumNameOrder')).toHaveTextContent(
    'Garçom',
    'Mesa',
    'Pedido',
    'valor',
    'Status',
    'ações'
  );
  expect(screen.getByRole('buttonNameOrder')).toHaveTextContent('Adicionar');
});
