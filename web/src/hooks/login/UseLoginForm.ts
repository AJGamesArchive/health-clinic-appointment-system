// Imports
import { useState, useCallback } from "react";
import useAPIService from "../services/UseAPIService";

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
  // states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Hooks
  const apiService = useAPIService(
    'POST',
    '/token/internal/cookie',
    {},
    {},
    {
      "Authorization": `Basic ${email}:${password}`,
    },
    {
      immediate: false,
      ignoreStatusCodes: [],
    },
  );

  // Function to handle email change
  const onEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  // Function to handle password change
  const onPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  // Function to handle form submission
  const onSubmit = useCallback(async () => {
    // Set form states
    setLoading(true);
    setSubmitted(true);
    setError(null);

    // Validate inputs
    if(!email || !password) return;

    // Send login request
    const status: number = await apiService.reTrigger();
    if(status !== 200 && status !== 201) {
      setError(apiService.message);
      return;
    };

    //TODO Add redirect logic here
  }, [email, password]);

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