// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/registration" element={<SignupPage/>} />
        <Route path="/CustomerDashboardPage" element={<CustomerDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
