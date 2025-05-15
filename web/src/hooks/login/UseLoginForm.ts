// Imports
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAPIService from "../services/UseAPIService";
import encodeBase64 from "../../utilities/core/EncodeBase64";

/**
 * Type to define the states exposed by the useGetAllDoctors hook
 */
export type UseLoginFormHook = {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  message: string | null;
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
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Hooks
  const nav = useNavigate();
  const apiService = useAPIService(
    'POST',
    '/token/internal/cookie',
    {},
    {},
    {
      "Authorization": `Basic ${encodeBase64(`${email}:${password}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
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
    setSubmitted(true);

    // Validate inputs
    if(!email || !password) return;

    // Send login request
    const status: number = await apiService.reTrigger();
    if(status !== 200 && status !== 201) return;

    // Send to internal page
    setTimeout(() => {
      nav("/profile");
    }, 1000);
    return;
  }, [email, password]);

  // Return states
  return {
    email,
    password,
    error: apiService.error,
    loading: apiService.loading,
    message: apiService.message,
    submitted,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  };
};

export default useLoginForm;