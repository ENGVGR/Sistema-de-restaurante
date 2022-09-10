import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Menu from '../pages/menu';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Menu />} path="/" exact />
      </Routes>
    </BrowserRouter>
  );
}
