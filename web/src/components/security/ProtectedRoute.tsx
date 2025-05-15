// Core Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useRouteAUth, { UseRouteAuthHook } from '../../hooks/security/UseRouteAuth';
import AccountRoles from '../../types/data/AccountRoles';

// Component Props Interface
interface ProtectedRouteProps {
  requiredRank: AccountRoles | 'Any',
  loading: React.ReactNode
  redirect?: string;
  fallback: React.ReactNode;
};

/**
 * React function to handle authentication checks when entering an route
 * @returns ProtectedRoute Component
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRank,
  loading,
  redirect,
  fallback
}) => {
  // Component hooks
  const auth: UseRouteAuthHook = useRouteAUth(requiredRank,  300000);

  // Handle access states
  if(auth.access === true && !auth.error) {
    return <Outlet/>;
  } else if (auth.access === false && !auth.error) {
    return redirect ? <Navigate to={redirect}/> : fallback;
  } else if (auth.access === null) {
    return <Navigate to="/login"/>;
  } else {
    return loading;
  };
};

export default ProtectedRoute;
