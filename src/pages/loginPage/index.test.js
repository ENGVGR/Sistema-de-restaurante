import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import LoginPage from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render LoginPage', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('card')).toHaveTextContent(/Hello!/);
  expect(screen.getByRole('login')).toHaveTextContent(/Login/);
});
