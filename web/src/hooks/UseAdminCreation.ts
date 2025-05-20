import { useState, useEffect } from "react";
import AccountRoles from "../types/data/AccountRoles";
import useAPIService from "./services/UseAPIService";
import { Dispatch, SetStateAction } from "react";

interface AdminCreationProps {
    submitted: boolean;
    setSubmitted: Dispatch<SetStateAction<boolean>> 
    forename: string;
    setForename: Dispatch<SetStateAction<string>>;
    surname: string;
    setSurname: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    role: string;
    setRole: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    passwordStrength: boolean;
    setPasswordStrength: Dispatch<SetStateAction<boolean>>;
    toastVisible: boolean;
    setToastVisible: Dispatch<SetStateAction<boolean>>;
    toastMessage: string;
    setToastMessage: Dispatch<SetStateAction<string>>;
    save: () => Promise<void>;
    creationReq: {
        loading: boolean;
        status: number;
        error: string | null;
        message: string | null;
    };
    patchReq: {
        loading: boolean;
        status: number;
        error: string | null;
        message: string | null;
    };
};

export function useAdminCreation(): AdminCreationProps {
    const [id, setId] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
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

    const creationReq = useAPIService<{
        id: string;
        role: AccountRoles;
        createdAt: string;
    }>(
        'POST',
        '/auth/internal/admin/admin/account',
        {
            title,
            forenames: forename,
            surname,
            email,
            password,
            role: "Admin",
        },
        {},
        {},
        { immediate: false }
    );
    const patchReq = useAPIService<{
        id: string;
        updatedAt: string;
    }>(
        'PATCH',
        `/auth/internal/admin/admin/${id}`,
        { staffRole: role },
        {},
        {},
        { immediate: false },
    );

    useEffect(() => {
        if(!creationReq.data) return;
        setId(creationReq.data.id);
    }, [creationReq.data]);

    async function saveAccount() {
        if (!forename) { setToastVisible(true); setToastMessage("Please enter forename"); return;};
        if (!surname) { setToastVisible(true); setToastMessage("Please enter surname"); return;};
        if (!email) { setToastVisible(true); setToastMessage("Please enter email"); return;};
        if (!title) { setToastVisible(true); setToastMessage("Please enter title"); return;};
        if (!role) { setToastVisible(true); setToastMessage("Please enter role"); return;};
        if (!password) { setToastVisible(true); setToastMessage("Please enter password"); return;};
        if (!confirmPassword) { setToastVisible(true); setToastMessage("Please enter confirmation"); return;};
        if (password !== confirmPassword) { setToastVisible(true); setToastMessage("Password does not match confirmation."); return;};

        setSubmitted(true);

        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;
        message += "\nRole: " + role;
        message += "\nPassword: " + password;
        
        const mainStatus: number = await creationReq.reTrigger();
        if(mainStatus === 201 && !!creationReq.data?.id) await patchReq.reTrigger(
            undefined,
            `/auth/internal/admin/admin/${creationReq.data?.id}`
        );
        return;
    };

    return ({
        submitted, setSubmitted,
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
        save: saveAccount,
        creationReq: {
            loading: creationReq.loading,
            error: creationReq.error,
            status: creationReq.status,
            message: creationReq.message,
        },
        patchReq: {
            loading: patchReq.loading,
            error: patchReq.error,
            message: patchReq.message,
            status: patchReq.status,
        }
    });
}