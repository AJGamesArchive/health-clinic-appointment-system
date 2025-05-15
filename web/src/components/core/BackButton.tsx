// Core Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';

// Component Props Interface
interface BackButtonProps {
  label?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  backFactor: number;
};

/**
 * React function to render the back button component
 * @returns BackButton Component
 */
const BackButton: React.FC<BackButtonProps> = ({
  label,
  variant,
  disabled,
  className,
  backFactor,
}) => {
  // Component variable
  const navigate = useNavigate();

  // Function to call useNavigation to go back a page
  const goBack = async (): Promise<void> => {
    navigate(backFactor);
    return;
  };

  // Return JSX
  return <Button
    onClick={goBack}
    variant={variant}
    className={className}
    disabled={disabled}
  >
    {label}
  </Button>
};

export default BackButton;
