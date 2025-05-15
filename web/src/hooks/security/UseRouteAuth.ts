// Imports
import { useState, useEffect } from "react";
import useAPIService, { APIResponse } from "../services/UseAPIService";
import JWTAccountData from "../../types/data/JWTAccountData";
import AccountRoles from "../../types/data/AccountRoles";

//TODO Build refresh token system into this hook

/**
 * Type to define the states exposed by the useAccessController hook
 */
export type UseRouteAuthHook = {
  access: boolean | null | undefined;
  user: JWTAccountData | null;
  loading: boolean;
  error: string | null;
  status: number;
  logout: () => Promise<void>;
  loadingLogout: boolean;
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
  const checkLogin: APIResponse<JWTAccountData> = useAPIService(
    'GET',
    "/auth/internal/session/current/user",
    {},
    {},
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  );
  const logoutReq: APIResponse<null> = useAPIService(
    'DELETE',
    "/token/internal/cookie/logout",
    {},
    {},
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    {
      immediate: false,
      ignoreStatusCodes: [],
    },
  );

  // States
  const [access, setAccess] = useState<boolean | null | undefined>(undefined);
  const [user, setUser] = useState<JWTAccountData | null>(null);

  // Function to handle logout
  const logout = async () => {
    // Call the logout request
    await logoutReq.reTrigger();
    window.location.href = '/login';
    return;
  };

  // Effect to check for access
  useEffect(() => {
    if(checkLogin.error) {
      setAccess(null);
      return;
    };
    if(checkLogin.data) {
      if(requiredRank !== 'Any' && checkLogin.data.role !== requiredRank) {
        setAccess(false);
        return;
      };
      setUser(checkLogin.data);
      setAccess(true);
    };
    return;
  }, [checkLogin.data, checkLogin.error]);

  // Effect to setup access listener if param is passed
  useEffect(() => {
    if(checkContinually) {
      // Setup an interval to check for access
      const interval = setInterval(() => {
        checkLogin.reTrigger();
      }, checkContinually);

      // Clear the interval on unmount
      return () => clearInterval(interval);
    };
  }, []);

  return {
    access,
    user,
    loading: checkLogin.loading,
    error: checkLogin.error,
    status: checkLogin.status,
    logout,
    loadingLogout: logoutReq.loading,
  };
};

export default useRouteAuth;