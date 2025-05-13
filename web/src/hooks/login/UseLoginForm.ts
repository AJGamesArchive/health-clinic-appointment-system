// Imports
import { useState, useCallback } from "react";

/**
 * Type to define the states exposed by the useGetAllDoctors hook
 */
export type UseLoginFormHook = {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  submitted: boolean;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

/**
 * Hook to fetch all doctors in the system
 */
function useLoginForm(): UseLoginFormHook {
  // Hooks & states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Function to handle email change
  const onEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  // Function to handle password change
  const onPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  // Function to handle form submission
  const onSubmit = useCallback(() => {
    setLoading(false);
    setSubmitted(true);
    setError("Login Error");
    if(!email || !password) return;
  }, []);

  // Return states
  return {
    email,
    password,
    error,
    loading,
    submitted,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  };
};

export default useLoginForm;