import { useState, useEffect } from "react";
import AccountData from "../types/data/AccountData";
import { cloneDeep } from "lodash";
import useAPIService, { APIResponse } from "./services/UseAPIService";
import PatientData from "../types/data/PatientData";
import DoctorData from "../types/data/DoctorData";
import AdminData from "../types/data/AdminData";
import AccountRoles from "../types/data/AccountRoles";
import { UseRouteAuthHook } from "./security/UseRouteAuth";

type APIAccountData = AccountData & { data: object | undefined };

export interface UseProfileHook {
  data: AccountData | null;
  loading: boolean;
  error: string | null;
}

export function useAccountProfile(auth: UseRouteAuthHook, id?: string, type?: AccountRoles) {
  // States
  const [data, setData] = useState<AccountData | null>(null);
  // Hooks
  const apiService: APIResponse<APIAccountData> = id
    ? useAPIService<APIAccountData>(
        "GET",
        `/auth/internal/${auth.user?.role === "Admin" ? 'admin' : 'doctor'}/${auth.user?.role === "Admin" ? 'account' : 'patient'}/` + id,
        {},
        {},
        {
          "Content-Type": "application/json",
        }
      )
    : useAPIService<APIAccountData>(
        "GET",
        "/auth/internal/profile",
        {},
        {},
        {
          "Content-Type": "application/json",
        }
      );

  useEffect(() => {
    if (apiService.data) {
      if (type) {
         const clone: APIAccountData = {...apiService.data, 
            data: undefined, 
            patientData:
            type === "Patient"
              ? (cloneDeep(apiService.data.data) as PatientData)
              : undefined,
          doctorData:
            type === "Doctor"
              ? (cloneDeep(apiService.data.data) as DoctorData)
              : undefined,
          adminData:
            type === "Admin"
              ? (cloneDeep(apiService.data.data) as AdminData)
              : undefined}
          setData(clone);  
      } else {
        const clone: APIAccountData = {
          ...apiService.data,
          data: undefined,
          patientData:
            apiService.data.role === "Patient"
              ? (cloneDeep(apiService.data.data) as PatientData)
              : undefined,
          doctorData:
            apiService.data.role === "Doctor"
              ? (cloneDeep(apiService.data.data) as DoctorData)
              : undefined,
          adminData:
            apiService.data.role === "Admin"
              ? (cloneDeep(apiService.data.data) as AdminData)
              : undefined,
        };
        setData(clone);
      }
    }
  }, [apiService.data]);

  return {
    data,
    loading: apiService.loading,
    error: apiService.error,
  };
}
