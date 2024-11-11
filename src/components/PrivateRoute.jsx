// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ childeren }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return childeren;;
};

export default PrivateRoute;
