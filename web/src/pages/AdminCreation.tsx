import { useState } from "react";
import Layout from "../components/ui/Layout";
import { Badge, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";

const AdminCreation: React.FC = () => {
    const [ forename, setForename ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ title, setTitle ] = useState<string>("");
    const [ role, setRole ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ passwordStrength, setPasswordStrength ] = useState<boolean>(false);

    function saveAccount() {
        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;
        message += "\nRole: " + role;
        message += "\nPassword: " + password;
        console.log(message)
    }

    return (
        <Layout>
            <div style={{width: "600px", margin: "auto"}}>
                <h2>Create Account <Badge style={{margin: "0 10px", }} bg="success">Admin</Badge></h2>
                <Form>
                    <h3 style={{margin: "20px 0 10px 0"}}>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    { password && <PasswordStrengthChecker password={password} setPasswordStrength={setPasswordStrength}/>}
                    <p style={{color: "red"}}>DEBUG: password strength is: {passwordStrength.toString()}</p>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    { confirmPassword && password !== confirmPassword && <Alert variant="danger" style={{marginTop: "10px"}}>Error: Passwords do not match.</Alert>}

                    <h3 style={{margin: "20px 0 10px 0"}}>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={title} onChange={(e) => setTitle(e.target.value)}>
                        <option>select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={forename} onChange={(e) => setForename(e.target.value)}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option>select a role</option>
                        <option>CEO</option>
                    </Form.Select>

                    <div style={{textAlign: "center"}}>
                        <Button 
                        variant="secondary" 
                        style={{margin: "10px"}}>
                        Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => saveAccount()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default AdminCreation;