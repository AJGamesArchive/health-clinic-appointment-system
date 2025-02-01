// Imports
import { useEffect, useState, useCallback } from "react";
import Doctor from "../types/Doctor";
import api from "../services/api";

/**
 * Type to define the states exposed by the useGetAllDoctors hook
 */
export type UseGetAllDoctorsHook = {
  data: Doctor[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

/**
 * Hook to fetch all doctors in the system
 */
function useGetAllDoctors(): UseGetAllDoctorsHook {
  // Hooks & states
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all doctors from the API
  const getAllDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Doctor[]>("/doctors", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to fetch doctors: ${err.message}`);
    } finally {
      setLoading(false);
    };
  }, []);

  // Hook to type-cast review data received from the API
  useEffect(() => {
    getAllDoctors();
  }, []);


  // Return states
  return {
    data,
    loading,
    error,
    refresh: getAllDoctors,
  };
};

export default useGetAllDoctors;