import { useEffect, useState } from "react";
import AppointmentData from "../types/data/AppointmentData";
import useAPIService, { APIResponse } from "./services/UseAPIService";

export interface appointmentType {
    appointments: AppointmentData[],
    upcomingAppointments: AppointmentData[],
    previousAppointments: AppointmentData[]
}

export function useAppointments(type: "upcoming" | "past" | "all" | "cancelled") {
    const [ data, setData ] = useState<AppointmentData | appointmentType | null>(null) 

    const apiService: APIResponse<AppointmentData | appointmentType> = useAPIService<AppointmentData | appointmentType>(
        "GET",
        "/auth/internal/admin/appointments/" + type,
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


