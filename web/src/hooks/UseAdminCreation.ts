import { useState } from "react";

export function useAdminCreation() {
    const [ forename, setForename ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ title, setTitle ] = useState<string>("");
    const [ role, setRole ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ passwordStrength, setPasswordStrength ] = useState<boolean>(false);
    const [ toastVisible, setToastVisible ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");

    function saveAccount() {
        if (!forename) { setToastVisible(true); setToastMessage("Please enter forename"); return;};
        if (!surname) { setToastVisible(true); setToastMessage("Please enter surname"); return;};
        if (!email) { setToastVisible(true); setToastMessage("Please enter email"); return;};
        if (!title) { setToastVisible(true); setToastMessage("Please enter title"); return;};
        if (!role) { setToastVisible(true); setToastMessage("Please enter role"); return;};
        if (!password) { setToastVisible(true); setToastMessage("Please enter password"); return;};
        if (!confirmPassword) { setToastVisible(true); setToastMessage("Please enter confirmation"); return;};

        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;
        message += "\nRole: " + role;
        message += "\nPassword: " + password;
        console.log(message);
    };

    return ({
        forename, setForename,
        surname, setSurname,
        email, setEmail,
        title, setTitle,
        role, setRole,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        passwordStrength, setPasswordStrength,
        toastVisible, setToastVisible,
        toastMessage, setToastMessage,
        saveAccount
    });
}