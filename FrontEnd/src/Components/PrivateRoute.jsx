import React from 'react'
import { Navigate, useLocation } from 'react-router'
import GeneralSkeleton from './GeneralSkeleton.jsx';
import { useAuth } from '../Contexts/Auth.Context.jsx'

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <GeneralSkeleton />
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;