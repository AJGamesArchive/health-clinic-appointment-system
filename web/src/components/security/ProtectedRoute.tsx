// Core Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useRouteAUth, { UseRouteAuthHook } from '../../hooks/security/UseRouteAuth';
import AccountRoles from '../../types/data/AccountRoles';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'react-bootstrap';

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
  const auth: UseRouteAuthHook = useRouteAUth(requiredRank,  61000); // 300000

  // Handle access states
  if(auth.access === true && !auth.error) {
    return (
      <AuthContext.Provider value={auth}>
        <Outlet/>
      </AuthContext.Provider>
    );
  } else if (auth.access === false && !auth.error) {
    return redirect ? <Navigate to={redirect}/> : fallback;
  } else if (auth.access === null) {
    return (
      <div>
        <h1>{auth.status}</h1>
        <h2>{auth.error}</h2><br/>
        {auth.status !== 401 && (
          <Button
            variant="warning"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        )}
        {auth.status === 401 && (
          <Button
            variant="primary"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </Button>
        )}
      </div>
    );
  } else {
    return loading;
  };
};

export default ProtectedRoute;
