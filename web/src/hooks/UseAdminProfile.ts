import { useEffect, useState } from "react";
import { useAccountProfile, UseProfileHook } from "./UseProfileHook";
import { cloneDeep } from "lodash";
import AccountData from "../types/data/AccountData";
import AdminData from "../types/data/AdminData";
import { useParams } from "react-router-dom";
import useAPIService from "./services/UseAPIService";
import { useAuthContext } from "../contexts/AuthContext";

interface UseAdminProfileHook {
    profile: UseProfileHook;
    updateProfile: () => void;
    toggleUpdateEnabled: () => void;
    updateDisabled: boolean,
    updateField: (field: keyof AccountData, newValue: string, adminField?: keyof AdminData) => void;
    modifiedProfile: AccountData | undefined;
    coreAccountReq: {
        status: number;
        loading: boolean;
        error: string | null;
        message: string | null;
    };
    adminAccountReq: {
        status: number;
        loading: boolean;
        error: string | null;
        message: string | null;
    };
    saved: boolean;
    save: () => Promise<void>;
};

export function useAdminProfile(): UseAdminProfileHook {
    // States
    const { id } = useParams();
    const auth = useAuthContext();
    
    const useProfile = id? useAccountProfile(auth, id, "Admin") : useAccountProfile(auth);
    const [saved, setSaved] = useState<boolean>(false);
    const [ updateDisabled, setUpdateDisabled ] = useState<boolean>(true);
    const [ modifiedProfile, setModifiedProfile ] = useState<AccountData | undefined>(undefined);

    // API Request Hooks
    const coreAccountReq = useAPIService(
        'PATCH',
        `/auth/internal/admin/account/${modifiedProfile?.id || "Unknown"}`,
        {
            title: modifiedProfile?.title ?? undefined,
            forenames: modifiedProfile?.forenames ?? undefined,
            surname: modifiedProfile?.surname ?? undefined,
            email: modifiedProfile?.email ?? undefined,
            password: modifiedProfile?.password ?? undefined,
        },
        {},
        {},
        {
            immediate: false,
            ignoreStatusCodes: [],
        },
    );
    const adminAccountReq = useAPIService(
        'PATCH',
        `/auth/internal/admin/admin/${modifiedProfile?.id || "Unknown"}`,
        {
            staffRole: modifiedProfile?.adminData?.staffRole ?? undefined,
        },
        {},
        {},
        {
            immediate: false,
            ignoreStatusCodes: [],
        },
    );

    const saveAccount = async (): Promise<void> => {
        setSaved(true);
        const status: number = await coreAccountReq.reTrigger();
        let embedStatus: number = 0;
        if(status === 200) embedStatus = await adminAccountReq.reTrigger();
        if(embedStatus === 200) setUpdateDisabled(true);
        return;
    };

    function updateField(field: keyof AccountData, newValue: string, adminField?: keyof AdminData) {
        if (!modifiedProfile) return;
        setModifiedProfile({...modifiedProfile, [field]: (!adminField) ? newValue : {
            [adminField]: newValue
        } });
    };

    useEffect(() => {
        if(useProfile.data && !modifiedProfile) (setModifiedProfile(cloneDeep(useProfile.data)))
    }, [ useProfile.data])

    function updateProfile () {
        // Send all the information to the backend to save it
        console.log("Save profile button pressed");
    };

    function toggleUpdateEnabled() {
        setUpdateDisabled(!updateDisabled);
    };

    return ({
        profile: useProfile,
        updateProfile,
        toggleUpdateEnabled,
        updateDisabled,
        updateField,
        modifiedProfile,
        coreAccountReq: {
            status: coreAccountReq.status,
            loading: coreAccountReq.loading,
            error: coreAccountReq.error,
            message: coreAccountReq.message,
        },
        adminAccountReq: {
            status: coreAccountReq.status,
            loading: adminAccountReq.loading,
            error: adminAccountReq.error,
            message: adminAccountReq.message,
        },
        saved,
        save: saveAccount,
    });
}