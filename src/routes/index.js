import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Menu from '../pages/menu';
import Monitor from '../pages/clientMonitoring';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Menu />} path="/" exact />
        <Route element={<Monitor />} path="/clientMonitoring" exact />
      </Routes>
    </BrowserRouter>
  );
}
