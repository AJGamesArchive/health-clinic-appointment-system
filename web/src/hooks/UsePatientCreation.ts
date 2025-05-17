import { useState } from "react";

type patient = {
    forename: string,
    surname: string,
    email: string,
    title: string,
    password: string,
    dateOfBirth: string,
    bloodType: string,
    gender: string,
    conditions: string,
    allergies: string,
    contactPhone: string,
    contactEmail: string,
    emergencyContactPhone: string,
    emergencyContactEmail: string,
    emergencyContactRelationship: string,
    address: address
};

type address = {
    addressLine1: string,
    addressLine2: string,
    city: string,
    county: string,
    postCode: string
};

export function usePatientCreation () {
    const [ patient, setPatient ] = useState<patient>({
        email: "",
        password: "",
        title: "",
        forename: "",
        surname: "",
        dateOfBirth: "",
        bloodType: "",
        gender: "",
        conditions: "",
        allergies: "",
        contactPhone: "",
        contactEmail: "",
        address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            county: "",
            postCode: ""
        },
        emergencyContactPhone: "",
        emergencyContactEmail: "",
        emergencyContactRelationship: "",
    });

    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ passwordStrength, setPasswordStrength ] = useState<boolean>(false);
    const [ toastVisible, setToastVisible ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");
    const [ age, setAge ] = useState<number>(0);

    const today = new Date();

    const updatePatient = (key: keyof patient, value: string, addressKey?: keyof address) => {
        if (key === "address" && addressKey) {
            setPatient({
                ...patient, address: {
                    ...patient.address, [addressKey]: value
                }
            })
            return;
        }
        setPatient({
        ...patient,
        [key]: value,
    });};

    function saveProfile () {
        if (!patient) return;

        for (key in patient) {
            if (key === "address") {
                var addressKey: keyof address;
                for (addressKey in patient.address) {
                    if (addressKey === "addressLine2") {
                        continue;
                    };
                    if (!patient.address[addressKey]) {
                        setToastVisible(true);
                        setToastMessage("Please enter " + addressKey)
                        return;
                    };
                };
                
            } else {
                if (key === "conditions") { continue; };
                if (key === "allergies") { continue; };
                if (!patient[key] || /Select a/.test(patient[key])) {
                    setToastVisible(true);
                    setToastMessage("Please enter " + key)
                    return;
                };
            };
        };

        if (!confirmPassword || confirmPassword === "") {
            setToastVisible(true);
            setToastMessage('Please confirm your password under "Confirm Password".');
            return;
        }

        if (confirmPassword !== patient.password) {
            setToastVisible(true);
            setToastMessage("Your password and password confirmation do not match.");
            return;
        };

        setToastVisible(false);
        setToastMessage("");
        
        // Send all the information to the backend to save it
        var message = "Saved account with credentials \n";
        var key: keyof patient;
        for (key in patient) {
            if (key === "address") {
                var addressKey: keyof address;
                message += "address: { \n"
                for (addressKey in patient.address) {
                    message += "    " + addressKey + ": " + patient.address[addressKey] + "\n";
                };
                message += "} \n";
            } else {
                message += key + ": " + patient[key] + "\n";
            }
        }
        console.log(message);
    };

    function updateAge(dateOfBirth: string) {
        const dob = new Date(dateOfBirth);
        var age = today.getFullYear() - dob.getFullYear();
        console.log(dob.getFullYear())
        console.log(dob)
        var monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) { 
            age -= 1; 
        };
        setAge(age);
    }

    return {
        patient, 
        saveProfile,
        updatePatient,
        passwordStrength, setPasswordStrength,
        confirmPassword, setConfirmPassword,
        toastVisible, setToastVisible,
        toastMessage, setToastMessage,
        age, updateAge
    };
};