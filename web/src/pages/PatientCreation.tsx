import { useState } from "react";
import Layout from "../components/ui/Layout";
import { Alert, Badge, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";

const PatientCreation: React.FC = () => {
    const [ forename, setForename ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ title, setTitle ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ passwordStrength, setPasswordStrength ] = useState<boolean>(false);

    function saveProfile () {
        // Send all the information to the backend to save it
        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;      
        console.log(message)
    }

    return (
        <Layout>
            <div>
                <h2>Create Account <Badge style={{margin: "0 10px", }} bg="info">Patient</Badge></h2>
                <p>To be added :)</p>
            </div>
        </Layout>
    );
};

export default PatientCreation;