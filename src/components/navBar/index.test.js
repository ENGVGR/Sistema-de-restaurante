import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import MyNavBar from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('render navBar', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<MyNavBar />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );

  expect(screen.getByRole('title')).toHaveTextContent(/X Burger/);
  expect(screen.getByRole('login')).toHaveTextContent(/Login/);
  expect(screen.getByRole('cardápio')).toHaveTextContent(/Cardápio/);
});
