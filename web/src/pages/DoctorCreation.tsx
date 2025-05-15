import { useState } from "react";
import Layout from "../components/ui/Layout";
import { Alert, Badge, Button, Table  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";

const daySchedule = () => {
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    return { startTime, setStartTime, endTime, setEndTime };
}

const DoctorCreation: React.FC = () => {
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

    const monday = daySchedule();
    const tuesday = daySchedule();
    const wednesday = daySchedule();
    const thursday = daySchedule();
    const friday = daySchedule();

    function saveProfile () {
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
    }

    return (
        <Layout>
            <div>
                <h2>Create Account <Badge style={{margin: "0 10px", }} bg="secondary">Doctor</Badge></h2>
                <Form>
                    <h3>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    { password && <PasswordStrengthChecker password={password} setPasswordStrength={setPasswordStrength}/>}
                    <p style={{color: "red"}}>DEBUG: password strength is: {passwordStrength.toString()}</p>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    { confirmPassword && password !== confirmPassword && <Alert variant="danger" style={{marginTop: "10px"}}>Error: Passwords do not match.</Alert>}
<h3>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={title} onChange={(e) => setTitle(e.target.value)}>
                        <option>Select a title</option>
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
                    <Form.Label>Specialty</Form.Label>
                    <Form.Select value={specialism} onChange={(e) => setSpecialism(e.target.value)}>
                        <option>Select a specialism</option>
                        <option>Cardiovascular Health</option>
                    </Form.Select>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)}/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control type="number" placeholder="01234567890" value={workPhone} onChange={(e) => setWorkPhone(e.target.value)}/>

                    <h3>Working Hours</h3>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <th style={{paddingLeft: 0}}>Day</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Monday</td>
                                <td><Form.Control type="time" value={monday.startTime} onChange={(e) => monday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={monday.endTime} onChange={(e) => monday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Tuesday</td>
                                <td><Form.Control type="time" value={tuesday.startTime} onChange={(e) => tuesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={tuesday.endTime} onChange={(e) => tuesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Wednesday</td>
                                <td><Form.Control type="time" value={wednesday.startTime} onChange={(e) => wednesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={wednesday.endTime} onChange={(e) => wednesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Thursday</td>
                                <td><Form.Control type="time" value={thursday.startTime} onChange={(e) => thursday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={thursday.endTime} onChange={(e) => thursday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Friday</td>
                                <td><Form.Control type="time" value={friday.startTime} onChange={(e) => friday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={friday.endTime} onChange={(e) => friday.setEndTime(e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{textAlign: "center"}}>
                        <Button 
                        variant="secondary" 
                        style={{margin: "10px"}}>
                        Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => saveProfile()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default DoctorCreation;