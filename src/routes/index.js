import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Menu from '../pages/menu';
import Stock from '../pages/stock';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Menu />} path="/" exact />
        <Route element={<Stock />} path="/stock" exact />
      </Routes>
    </BrowserRouter>
  );
}
