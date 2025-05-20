import React from "react";
import { Alert } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

interface props {
    password: string,
    setPasswordStrength(arg0: boolean): void
}

// Takes a password and method setPasswordStrength. Strength of the password is explained
// to the user, and setPasswordStrength updates the password's strength as the password changes.
// This can be used to lock the "create account" buttons until a sufficient password is provided.
const PasswordStrengthChecker: React.FC<props> = ({password, setPasswordStrength}) => {
    // Assesses given password against various regexes to check the password's strength.
    const length = password.length > 8 ? 1 : 0;
    const lowercase = /[a-z]/.test(password) ? 1 : 0;
    const uppercase = /[A-Z]/.test(password) ? 1 : 0;
    const number = /[0-9]/.test(password) ? 1 : 0;

    // totalScore needs to be a percentage for the progress bar. Each check has a weighting of 25%.
    const totalScore = (length + lowercase + uppercase + number)
    setPasswordStrength(totalScore === 4)

    return (
        <>
            <Alert variant="light" style={{marginTop: "10px"}}>
                <>
                    <p>{ length === 1 ? <>&#9989;</> : <>&#10060;</> } At least 8 characters long</p>
                    <p>{ lowercase === 1 ? <>&#9989;</> : <>&#10060;</> } Contains a lowercase letter</p>
                    <p>{ uppercase === 1 ? <>&#9989;</> : <>&#10060;</> } Contains an uppercase letter</p>
                    <p>{ number === 1 ? <>&#9989;</> : <>&#10060;</> } Contains a number</p>
                </>
                <ProgressBar now={totalScore*25} label={totalScore + "/4"} visuallyHidden/>
            </Alert>
        </>
    );
};

export default PasswordStrengthChecker;