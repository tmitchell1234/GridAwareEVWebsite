import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import PassResetOnePage from './pages/PassResetOnePage';
import PassResetTwo from './components/PassResetTwo';
import './App.css';

// ProtectedRoute component to handle access control
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('jwt');

  // Check if token exists
  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<SignupPage />} />
        <Route path="/resetPassword" element={<PassResetOnePage />} />
        <Route path="/PassResetTwo" element={<PassResetTwo />} /> 
        <Route
          path="/CustomerDashboardPage"
          element={<ProtectedRoute element={<CustomerDashboardPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;