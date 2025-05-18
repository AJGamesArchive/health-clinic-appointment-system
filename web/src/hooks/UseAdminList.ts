import { useState, useEffect } from "react";
import AccountData from "../types/data/AccountData";
import useAPIService, { APIResponse } from "./services/UseAPIService";
import AdminData from "../types/data/AdminData";


export function useAdminList(id?: number) {
    const [ data, setData ] = useState<AccountData[] | null>();
    const apiString = id ? "/auth/internal/accounts/" + id : "/auth/internal/accounts";
    
    const apiService: APIResponse<AccountData[]> = useAPIService<AccountData[]>(
        "GET",
        apiString,
        {},
        { "type": "Admin" },
        {
            "Content-Type": "application/json",
        },
    );

    useEffect(() => {
        if (apiService.data) {
            const data = apiService.data.map((admin) => {
                return {...admin, adminData: admin.adminData as AdminData}
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