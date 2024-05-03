import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path?: string;
  element?: React.ReactElement | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      element={
        token ? <Component {...rest} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default ProtectedRoute;
