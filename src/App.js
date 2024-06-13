// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActiveOrders from './components/ActiveOrders';
import CompletedOrders from './components/CompletedOrders';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';
import { AuthProvider } from './AuthContext';
import './App.css'; // Import the global CSS file

const App = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav>
            <ul className="nav-left">
              <li><Link to="/active-orders">Active Orders</Link></li>
              <li><Link to="/completed-orders">Completed Orders</Link></li>
            </ul>
           
             
          </nav>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/active-orders" element={<ProtectedRoute element={ActiveOrders} />} />
            <Route path="/completed-orders" element={<ProtectedRoute element={CompletedOrders} />} />
            <Route path="/" element={<ProtectedRoute element={ActiveOrders} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
