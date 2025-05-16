// Imports
import { createContext, useContext } from "react";
import { UseRouteAuthHook } from "../hooks/security/UseRouteAuth";

// Define Auth Context
export const AuthContext = createContext<UseRouteAuthHook | null>(null);

// Hook to fetch the current Auth Context
export const useAuthContext = (): UseRouteAuthHook => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};