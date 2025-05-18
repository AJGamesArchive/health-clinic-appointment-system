import { useEffect, useState } from "react";
import AppointmentData from "../types/data/AppointmentData";
import useAPIService, { APIResponse } from "./services/UseAPIService";

export function useAppointments(type: "upcoming" | "past" | "all" | "cancelled") {
    const [ data, setData ] = useState<AppointmentData | AppointmentData[] | null>(null) 

    const apiService: APIResponse<AppointmentData | AppointmentData[]> = useAPIService<AppointmentData | AppointmentData[]>(
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


