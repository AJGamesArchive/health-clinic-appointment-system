// Imports
import { useState, useEffect } from "react";
import useAPIService, { APIResponse } from "../services/UseAPIService";
import JWTAccountData from "../../types/data/JWTAccountData";
import AccountRoles from "../../types/data/AccountRoles";

/**
 * Type to define the states exposed by the useAccessController hook
 */
export type UseRouteAuthHook = {
  access: boolean | null | undefined;
  user: JWTAccountData | null;
  loading: boolean;
  error: string | null;
  status: number;
};

/**
 * Hook to ensure user is logged in & fetch a users core data
 * @param requiredRank - The required rank to access the resource
 * @param checkContinually - Optional parameter to pass a millisecond interval to check access at
 */
function useRouteAuth(
  requiredRank: AccountRoles | 'Any',
  checkContinually?: number,
): UseRouteAuthHook {
  // Hooks
  const response: APIResponse<JWTAccountData> = useAPIService(
    'GET',
    "/auth/internal/session/current/user",
    {},
    {},
    {},
  );

  // States
  const [access, setAccess] = useState<boolean | null | undefined>(undefined);
  const [user, setUser] = useState<JWTAccountData | null>(null);

  // Effect to check for access
  useEffect(() => {
    if(response.error) {
      setAccess(null);
      return;
    };
    if(response.data) {
      if(requiredRank !== 'Any' && response.data.role !== requiredRank) {
        setAccess(false);
        return;
      };
      setUser(response.data);
      setAccess(true);
    };
    return;
  }, [response.data]);

  // Effect to setup access listener if param is passed
  useEffect(() => {
    if(checkContinually) {
      // Setup an interval to check for access
      const interval = setInterval(() => {
        response.reTrigger();
      }, checkContinually);

      // Clear the interval on unmount
      return () => clearInterval(interval);
    };
  }, []);

  return {
    access,
    user,
    loading: response.loading,
    error: response.error,
    status: response.status,
  };
};

export default useRouteAuth;