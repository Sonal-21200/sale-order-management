// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
