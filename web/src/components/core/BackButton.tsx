// // Core Imports
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// // Import CSS
// import './BackButton.css';

// // Component Props Interface
// interface BackButtonProps {
//   label?: string;
//   icon?: string;
//   severity?: 'help' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
//   outlined?: boolean;
//   raised?: boolean;
//   disabled?: boolean;
//   className?: string;
//   backFactor: number;
// };

// /**
//  * React function to render the back button component
//  * @returns BackButton Component
//  */
// const BackButton: React.FC<BackButtonProps> = ({ label, icon, severity, outlined, raised, disabled, className, backFactor }) => {
//   // Component variable
//   const navigate = useNavigate();

//   // Function to call useNavigation to go back a page
//   const goBack = async (): Promise<void> => {
//     navigate(backFactor);
//     return;
//   };

// //TODO Update component to work with Bootstrap!!

//   // Return JSX
//   return <Button
//     label={label ? label : undefined}
//     icon={icon ? icon : undefined}
//     onClick={goBack}
//     severity={severity ? severity : undefined}
//     outlined={outlined}
//     className={className}
//     raised={raised}
//     disabled={disabled}
//   />
// };

// export default BackButton;
