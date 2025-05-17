import { useState, useEffect } from "react";
import AccountData from "../types/data/AccountData";
import useAPIService, { APIResponse } from "./services/UseAPIService";
import DoctorData from "../types/data/DoctorData";


export function useDoctorList() {
    const [ data, setData ] = useState<AccountData[] | null>();
    const apiService: APIResponse<AccountData[]> = useAPIService<AccountData[]>(
        "GET",
        "/auth/internal/accounts?type=Doctor",
        {},
        {},
        {
            "Content-Type": "application/json",
        },
    );

    useEffect(() => {
        if (apiService.data) {
            const data = apiService.data.map((doctor) => {
                return {...doctor, doctorData: doctor.doctorData as DoctorData}
            })
            setData(data)
        };
    }, [apiService.data])

    return ({
        data, 
        loading: apiService.loading,
        error: apiService.error 
    });
}