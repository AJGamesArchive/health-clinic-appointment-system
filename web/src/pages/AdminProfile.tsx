import { useState } from "react";
import Layout from "../components/ui/Layout";
import { Badge, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function getProfile () {
    return {
        email: "janesmith@gmail.com",
        title: "Miss",
        forename: "Jane",
        surname: "Smith",
        role: "CEO"
    };
};

const AdminProfile: React.FC = () => {
    const profile = getProfile();
    const [ forename, updateForename ] = useState<string>(profile.forename);
    const [ surname, updateSurname ] = useState<string>(profile.surname);
    const [ email, updateEmail ] = useState<string>(profile.email);
    const [ title, updateTitle ] = useState<string>(profile.title);
    const [ role, updateRole ] = useState<string>(profile.role);

    function updateProfile () {
        // Send all the information to the backend to save it
        console.log("Save profile button pressed")
    }

    // There should be a check here to see if a patient or doctor has tried to 
    // access this page (or someone who is logged out)
    return (
        <Layout>
            <div style={{width: "600px", margin: "auto"}}>
                <h2>{profile.forename} {profile.surname}<Badge style={{margin: "0 10px", }} bg="success">Admin</Badge></h2>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={title} onChange={(e) => updateTitle(e.target.value)}>
                        <option>select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={forename} onChange={(e) => updateForename(e.target.value)}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={surname} onChange={(e) => updateSurname(e.target.value)}/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => updateEmail(e.target.value)}/>
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={role} onChange={(e) => updateRole(e.target.value)}>
                        <option>select a role</option>
                        <option>CEO</option>
                    </Form.Select>

                    <div style={{textAlign: "center"}}>
                        <Button variant="secondary" style={{margin: "10px"}}>Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => updateProfile()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default AdminProfile;