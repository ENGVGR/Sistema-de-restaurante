import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Stock from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render stock', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<Stock />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('titleStock')).toHaveTextContent('Estoque');
  expect(screen.getByRole('subtitleStock')).toHaveTextContent(
    'Adicionar novo item'
  );
  expect(screen.getByRole('collumNameStock')).toHaveTextContent(
    'Nome',
    'Preço',
    '(R$)',
    'Quantidade',
    'Ações'
  );
  expect(screen.getByRole('buttonNameStock')).toHaveTextContent('Adicionar');
});
