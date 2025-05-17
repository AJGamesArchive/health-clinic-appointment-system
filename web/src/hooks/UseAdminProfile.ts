import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { UseRouteAuthHook } from "./security/UseRouteAuth";

export function useAdminProfile() {
    const auth: UseRouteAuthHook = useAuthContext();

    var profile;
    if (auth.user?.role === "Admin") {
        profile = {
            email: auth.user?.email,
            title: auth.user?.title,
            forename: auth.user?.forenames,
            surname: auth.user?.surname,
            role: auth.user?.role // This should actually use the embedded data
        };
    } else {
        profile = {
            email: "janesmith@gmail.com",
            title: "Miss",
            forename: "Jane",
            surname: "Smith",
            role: "CEO"
        };
    }
    
    const [ forename, updateForename ] = useState<string>(profile.forename);
    const [ surname, updateSurname ] = useState<string>(profile.surname);
    const [ email, updateEmail ] = useState<string>(profile.email);
    const [ title, updateTitle ] = useState<string>(profile.title);
    const [ role, updateRole ] = useState<string>(profile.role);
    const [ updateDisabled, setUpdateDisabled ] = useState<boolean>(true);

    function updateProfile () {
        // Send all the information to the backend to save it
        console.log("Save profile button pressed")
    }

    function toggleUpdateEnabled() {
        setUpdateDisabled(!updateDisabled);
    }

    return ({
        forename, updateForename,
        surname, updateSurname,
        email, updateEmail,
        title, updateTitle,
        role, updateRole,
        updateDisabled: updateDisabled, toggleUpdateEnabled,
        updateProfile,
    });
}