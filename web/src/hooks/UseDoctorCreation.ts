import { useState } from "react";

const daySchedule = () => {
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    return { startTime, setStartTime, endTime, setEndTime };
};

export function useDoctorCreation() {
    const [ forename, setForename ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ title, setTitle ] = useState<string>("");
    const [ specialism, setSpecialism ] = useState<string>(""); 
    const [ workEmail, setWorkEmail ] = useState<string>("");
    const [ workPhone, setWorkPhone ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ passwordStrength, setPasswordStrength ] = useState<boolean>(false);

    const [ toastVisible, setToastVisible ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");

    const monday = daySchedule();
    const tuesday = daySchedule();
    const wednesday = daySchedule();
    const thursday = daySchedule();
    const friday = daySchedule();

    function saveAccount () {
        if (!forename) { setToastVisible(true); setToastMessage("Please enter forename"); return;};
        if (!surname) { setToastVisible(true); setToastMessage("Please enter surname"); return;};
        if (!email) { setToastVisible(true); setToastMessage("Please enter email"); return;};
        if (!title) { setToastVisible(true); setToastMessage("Please enter title"); return;};
        if (!specialism) { setToastVisible(true); setToastMessage("Please enter specialism"); return;};
        if (!workEmail) { setToastVisible(true); setToastMessage("Please enter work email"); return;};
        if (!workPhone) { setToastVisible(true); setToastMessage("Please enter work mobile"); return;};
        if (!password) { setToastVisible(true); setToastMessage("Please enter password"); return;};
        if (!confirmPassword) { setToastVisible(true); setToastMessage("Please enter confirmation"); return;};
        if (password !== confirmPassword) { setToastVisible(true); setToastMessage("Passwords do not match"); return;};

        // Work out best way to handle schedule...

        // Send all the information to the backend to save it
        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;
        message += "\nSpecialism: " + specialism;
        message += "\nWork Email: " + workEmail;
        message += "\nWork Phone: " + workPhone;
        message += "\nMonday Schedule: " + monday.startTime + " to " + monday.endTime;
        message += "\nTuesday Schedule: " + tuesday.startTime + " to " + tuesday.endTime;
        message += "\nWednesday Schedule: " + wednesday.startTime + " to " + wednesday.endTime;
        message += "\nThursday Schedule: " + thursday.startTime + " to " + thursday.endTime;
        message += "\nFriday Schedule: " + friday.startTime + " to " + friday.endTime;        
        console.log(message)
    };

    return ({
        forename, setForename,
        surname, setSurname,
        email, setEmail,
        title, setTitle,
        specialism, setSpecialism,
        workEmail, setWorkEmail,
        workPhone, setWorkPhone,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        passwordStrength, setPasswordStrength,
        toastVisible, setToastVisible,
        toastMessage, setToastMessage,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saveAccount
    });
}