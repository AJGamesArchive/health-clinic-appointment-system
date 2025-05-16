// Core Imports
import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * React function to render the page loading component
 * @returns PageLoading Component
 */
const PageLoading: React.FC = () => {
  // Return JSX
  return (
    <div>
      <Spinner
        animation="border"
        variant="primary"
      />
    </div>
  );
};

export default PageLoading;
