import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </div>
  );
}

export default App;
