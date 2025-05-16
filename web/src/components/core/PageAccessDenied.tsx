// Core Imports
import React from 'react';
import BackButton from './BackButton';

/**
 * React function to handle authentication checks when entering an route
 * @returns ProtectedRoute Component
 */
const PageAccessDenied: React.FC = () => {
  // Return JSX
  return (
    <div>
      <h1>Access Denied</h1>
      <h2>You do not have permissions to access this page.</h2>
      <BackButton
        backFactor={-1}
        label='Back'
        variant="secondary"
      />
    </div>
  );
};

export default PageAccessDenied;
