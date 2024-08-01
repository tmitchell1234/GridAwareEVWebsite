// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
