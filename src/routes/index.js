import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import Menu from '../pages/menu';
import Monitor from '../pages/clientMonitoring';
import Stock from '../pages/stock';
import EmployeeMonitoring from '../pages/employeeMonitoring';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Menu />} path="/" exact />
        <Route element={<Monitor />} path="/clientMonitoring" exact />
        <Route element={<Stock />} path="/stock" exact />
        <Route
          element={<EmployeeMonitoring />}
          path="/employeeMonitoring"
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}
