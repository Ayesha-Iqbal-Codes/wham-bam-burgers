// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdmin, isLoggedIn, requiredAdmin }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (requiredAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
