import Layout from "../components/ui/Layout";
import { Badge, Button, Table  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const DoctorCreation: React.FC = () => {
    return (
        <Layout>
            <div style={{margin: "0 300px"}}>
                <h2>Create Account <Badge style={{margin: "0 10px", }} bg="secondary">Doctor</Badge></h2>
                <Form>
                    <h3>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password"/>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="repeat password"/>
                    <h3>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select>
                        <option>Select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename"/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname"/>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Select>
                        <option>Select a specialism</option>
                    </Form.Select>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control type="number" placeholder="01234 567890"/>

                    <h3>Working Hours</h3>
                    <Table borderless>
                        <thead>
                            <th>Day</th>
                            <th>Start</th>
                            <th>End</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Monday</td>
                                <td><Form.Control type="time"/></td>
                                <td><Form.Control type="time"/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Tuesday</td>
                                <td><Form.Control type="time"/></td>
                                <td><Form.Control type="time"/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Wednesday</td>
                                <td><Form.Control type="time"/></td>
                                <td><Form.Control type="time"/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Thursday</td>
                                <td><Form.Control type="time"/></td>
                                <td><Form.Control type="time"/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Friday</td>
                                <td><Form.Control type="time"/></td>
                                <td><Form.Control type="time"/></td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{textAlign: "center"}}>
                        <Button 
                        variant="secondary" 
                        style={{margin: "10px"}}>
                        Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default DoctorCreation;