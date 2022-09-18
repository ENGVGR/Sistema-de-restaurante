import React, { useMemo, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import Menu from '../pages/menu';
import Monitor from '../pages/clientMonitoring';
import Stock from '../pages/stock';
import UserContext from '../context/user.context';

export default function RoutesApp() {
  const [user, setUser] = useState();

  const globalUser = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={globalUser}>
      <BrowserRouter>
        <Routes>
          <Route element={<Menu />} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Monitor />} path="/clientMonitoring" exact />
          <Route element={<Stock />} path="/stock" exact />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
