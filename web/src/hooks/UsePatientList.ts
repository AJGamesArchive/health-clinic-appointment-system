import { useState, useEffect } from "react";
import AccountData from "../types/data/AccountData";
import useAPIService, { APIResponse } from "./services/UseAPIService";
import PatientData from "../types/data/PatientData";

export function usePatientList() {
    const [ data, setData ] = useState<AccountData[] | null>();
    const apiService: APIResponse<AccountData[]> = useAPIService<AccountData[]>(
        "GET",
        "/auth/internal/accounts",
        {},
        { "type": "Patient" },
        {
            "Content-Type": "application/json",
        },
    );

    useEffect(() => {
        if (apiService.data) {
            const data = apiService.data.map((patient) => {
                return {...patient, patientData: patient.patientData as PatientData}
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