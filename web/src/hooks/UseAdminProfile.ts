import { useEffect, useState } from "react";
import { useAccountProfile, UseProfileHook } from "./UseProfileHook";
import { cloneDeep } from "lodash";
import AccountData from "../types/data/AccountData";
import AdminData from "../types/data/AdminData";

interface UseAdminProfileHook {
    profile: UseProfileHook;
    updateProfile: () => void;
    toggleUpdateEnabled: () => void;
    updateDisabled: boolean,
    updateField: (field: keyof AccountData, newValue: string, adminField?: keyof AdminData) => void;
    modifiedProfile: AccountData | undefined;
};

export function useAdminProfile(): UseAdminProfileHook {
    // States
    const useProfile = useAccountProfile();
    const [ updateDisabled, setUpdateDisabled ] = useState<boolean>(true);
    const [ modifiedProfile, setModifiedProfile ] = useState<AccountData | undefined>(undefined);

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
    });
}