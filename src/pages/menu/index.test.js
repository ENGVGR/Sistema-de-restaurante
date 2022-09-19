import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Menu from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render menu', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<Menu />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('titleCardapio')).toHaveTextContent(/Cardápio/);
});
