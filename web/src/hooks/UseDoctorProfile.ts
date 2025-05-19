import { useEffect, useState } from "react";
import { useAccountProfile, UseProfileHook } from "./UseProfileHook";
import { cloneDeep } from "lodash";
import AccountData from "../types/data/AccountData";
import DoctorData, { DoctorWorkingHours, DoctorContactInfo } from "../types/data/DoctorData";
import { useParams } from "react-router-dom";

interface UseAdminProfileHook {
    profile: UseProfileHook;
    updateProfile: () => void;
    toggleUpdateEnabled: () => void;
    updateDisabled: boolean;
    modifiedProfile: AccountData | undefined;
    updateField: (newValue: string, firstField: keyof AccountData, secondField?: keyof DoctorData | null, thirdField?: keyof DoctorContactInfo | null) => void;
    getSchedule: (day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday") => DoctorWorkingHours | undefined;
    updateSchedule: (day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday", newTime: string, type: "start" | "end") => void;
};

export function useDoctorProfile(): UseAdminProfileHook {
    // States
    const { id } = useParams();
    
    const useProfile = id? useAccountProfile(id, "Doctor") : useAccountProfile();
    const [ updateDisabled, setUpdateDisabled ] = useState<boolean>(true);
    const [ modifiedProfile, setModifiedProfile ] = useState<AccountData | undefined>(undefined);

    function updateField(newValue: string, firstField: keyof AccountData, secondField?: keyof DoctorData | null, thirdField?: keyof DoctorWorkingHours | keyof DoctorContactInfo | null) {
        if (!modifiedProfile) return;
        setModifiedProfile({...modifiedProfile, [firstField]: (!secondField) ? newValue : {
            [secondField]: (!thirdField) ? newValue : { 
                [thirdField]: newValue
            }
        } });
    };

    function updateSchedule(day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday", newTime: string, type: "start" | "end") {
        if (!modifiedProfile?.doctorData?.workingHours) { return; }
        var toUpdate: DoctorWorkingHours | undefined = modifiedProfile?.doctorData?.workingHours.find((workingDay) => workingDay.day === day);
        if (!toUpdate || toUpdate === undefined) { return; }
        if (type === "start") {
            toUpdate.startTime = newTime;
        }
        else {
            toUpdate.endTime = newTime;
        };

        var newSchedule = (modifiedProfile.doctorData.workingHours).map((workingDay) => {
            return workingDay.day === day ? toUpdate! : workingDay;
        });

        if (newSchedule.length === 0) { return; }
        
        setModifiedProfile({...modifiedProfile, doctorData: 
            {...modifiedProfile?.doctorData, workingHours: 
                newSchedule 
            }
        })
        console.log("Should set " + day + " " + type + " time to " + newTime);
    };

    const getSchedule = (day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday") => 
        modifiedProfile?.doctorData?.workingHours.find((workingDay) => workingDay.day === day);

    useEffect(() => {
        if(useProfile.data && !modifiedProfile) (setModifiedProfile(cloneDeep(useProfile.data)))
    }, [ useProfile.data]);

    function updateProfile () {
        // Send all the information to the backend to save it
        console.log("Save profile button pressed");
        console.log("Account data: ");
        console.log(modifiedProfile);
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
        getSchedule, updateSchedule
    });
};