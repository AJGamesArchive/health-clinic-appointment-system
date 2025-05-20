import { useEffect, useState } from "react";
import AppointmentData from "../types/data/AppointmentData";
import useAPIService, { APIResponse } from "./services/UseAPIService";
import { useAuthContext } from "../contexts/AuthContext";
import { UseRouteAuthHook } from "./security/UseRouteAuth";

export interface appointmentType {
    appointments: AppointmentData[],
    upcomingAppointments: AppointmentData[],
    previousAppointments: AppointmentData[]
}

export function useAppointments(type: "upcoming" | "past" | "all" | "cancelled") {
    const [ data, setData ] = useState<AppointmentData | appointmentType | null>(null);
    const auth: UseRouteAuthHook = useAuthContext();

    const APIString = auth.user?.role === "Admin" ? "/auth/internal/admin/appointments/" : "/auth/internal/profile/appointments/"

    const apiService: APIResponse<AppointmentData | appointmentType> = useAPIService<AppointmentData | appointmentType>(
        "GET",
        APIString + type,
        {},
        {},
        {}
    );

    useEffect(() => {
        if (apiService.data) {
            setData(apiService.data)
        }
    }, [apiService.data]);

    return {
        data: data,
        loading: apiService.loading,
        error: apiService.error
    }
}


