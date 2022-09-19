import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Monitor from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render Monitor', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<Monitor />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('titleMonitor')).toHaveTextContent(
    /Acompanhamento de Clientes/
  );
  expect(screen.getByRole('subtitleMonitor')).toHaveTextContent(
    /Adicionar novo cliente/
  );
  expect(screen.getByRole('buttonNameMonitor')).toHaveTextContent(/Adicionar/);
});
