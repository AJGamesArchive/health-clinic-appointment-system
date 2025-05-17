import Layout from "../components/ui/Layout";
import { Alert, Badge, Button, Table, Toast  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";
import { useDoctorCreation } from "../hooks/UseDoctorCreation";

const DoctorCreation: React.FC = () => {
    const doctorCreation = useDoctorCreation();

    return (
        <Layout>
            <div>
                <Toast className="toast" bg="danger" show={doctorCreation.toastVisible} onClose={() => doctorCreation.setToastVisible(false)}>
                    <Toast.Header style={{backgroundColor: "#9C1C28", color: "white"}}><strong className="me-auto">Error</strong></Toast.Header>
                    <Toast.Body style={{color: "white"}}>{doctorCreation.toastMessage}</Toast.Body>
                </Toast>
                <h2>Create Account <Badge style={{margin: "0 10px", }} bg="secondary">Doctor</Badge></h2>
                <Form>
                    <h3>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={doctorCreation.email} onChange={(e) => doctorCreation.setEmail(e.target.value)}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={doctorCreation.password} onChange={(e) => doctorCreation.setPassword(e.target.value)}/>
                    { doctorCreation.password && <PasswordStrengthChecker password={doctorCreation.password} setPasswordStrength={doctorCreation.setPasswordStrength}/>}
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="repeat password" value={doctorCreation.confirmPassword} onChange={(e) => doctorCreation.setConfirmPassword(e.target.value)}/>
                    { doctorCreation.confirmPassword && doctorCreation.password !== doctorCreation.confirmPassword && <Alert variant="danger" style={{marginTop: "10px"}}>Error: Passwords do not match.</Alert>}
                    
                    <h3>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={doctorCreation.title} onChange={(e) => doctorCreation.setTitle(e.target.value)}>
                        <option>Select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={doctorCreation.forename} onChange={(e) => doctorCreation.setForename(e.target.value)}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={doctorCreation.surname} onChange={(e) => doctorCreation.setSurname(e.target.value)}/>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Select value={doctorCreation.specialism} onChange={(e) => doctorCreation.setSpecialism(e.target.value)}>
                        <option>Select a specialism</option>
                        <option>Cardiovascular Health</option>
                    </Form.Select>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={doctorCreation.workEmail} onChange={(e) => doctorCreation.setWorkEmail(e.target.value)}/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control type="number" placeholder="01234567890" value={doctorCreation.workPhone} onChange={(e) => doctorCreation.setWorkPhone(e.target.value)}/>

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
                                <td><Form.Control type="time" value={doctorCreation.monday.startTime} onChange={(e) => doctorCreation.monday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={doctorCreation.monday.endTime} onChange={(e) => doctorCreation.monday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Tuesday</td>
                                <td><Form.Control type="time" value={doctorCreation.tuesday.startTime} onChange={(e) => doctorCreation.tuesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={doctorCreation.tuesday.endTime} onChange={(e) => doctorCreation.tuesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Wednesday</td>
                                <td><Form.Control type="time" value={doctorCreation.wednesday.startTime} onChange={(e) => doctorCreation.wednesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={doctorCreation.wednesday.endTime} onChange={(e) => doctorCreation.wednesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Thursday</td>
                                <td><Form.Control type="time" value={doctorCreation.thursday.startTime} onChange={(e) => doctorCreation.thursday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={doctorCreation.thursday.endTime} onChange={(e) => doctorCreation.thursday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Friday</td>
                                <td><Form.Control type="time" value={doctorCreation.friday.startTime} onChange={(e) => doctorCreation.friday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={doctorCreation.friday.endTime} onChange={(e) => doctorCreation.friday.setEndTime(e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{textAlign: "center"}}>
                        <Button 
                        variant="secondary" 
                        style={{margin: "10px"}}>
                        Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => doctorCreation.saveAccount()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default DoctorCreation;