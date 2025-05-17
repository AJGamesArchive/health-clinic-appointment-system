import Layout from "../components/ui/Layout";
import { Badge, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useAdminProfile } from "../hooks/UseAdminProfile";


const AdminProfile: React.FC = () => {
    const adminProfile = useAdminProfile();

    // There should be a check here to see if a patient or doctor has tried to 
    // access this page (or someone who is logged out)
    return (
        <Layout>
            <div className="two-content-container">
                <div className="first" style={{padding: "20px", border: "1px solid lightgray", borderRadius: "5px", margin: "5px"}}>
                <h2>{adminProfile.forename} {adminProfile.surname}<Badge style={{margin: "0 10px", }} bg="success">Admin</Badge></h2>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={adminProfile.title} onChange={(e) => adminProfile.updateTitle(e.target.value)} disabled={adminProfile.updateDisabled}>
                        <option>select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={adminProfile.forename} onChange={(e) => adminProfile.updateForename(e.target.value)} disabled={adminProfile.updateDisabled}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={adminProfile.surname} onChange={(e) => adminProfile.updateSurname(e.target.value)} disabled={adminProfile.updateDisabled}/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={adminProfile.email} onChange={(e) => adminProfile.updateEmail(e.target.value)} disabled={adminProfile.updateDisabled}/>
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={adminProfile.role} onChange={(e) => adminProfile.updateRole(e.target.value)} disabled={adminProfile.updateDisabled}>
                        <option>select a role</option>
                        <option>CEO</option>
                        <option>Assistant to the regional manager</option>
                    </Form.Select>

                    <div style={{textAlign: "center"}}>
                        { ! adminProfile.updateDisabled ? 
                            <>
                                <Button variant="secondary" style={{margin: "10px"}} onClick={() => adminProfile.toggleUpdateEnabled()}>Cancel Editing</Button>
                                <Button variant="success" style={{margin: "10px"}} onClick={() => adminProfile.updateProfile()}>Save</Button>
                            </>
                        :
                            <Button variant="secondary" style={{margin: "10px"}} onClick={() => adminProfile.toggleUpdateEnabled()}>Edit profile</Button>
                        }
                    </div>
                </Form>
                </div>
                <div className="second" style={{textAlign: "left", padding: "10px"}}>
                    <h2>Menu</h2>
                    <h3 style={{fontSize: "large", marginBottom: "5px"}}>Manage Accounts</h3>
                    <Button style={{margin: "2px"}}>Go to Patients</Button><br/>
                    <Button style={{margin: "2px"}} variant="secondary">Go to Doctors</Button><br/>
                    <Button style={{margin: "2px"}} variant="success">Go to Administrators</Button><br/>
                    <h3 style={{fontSize: "large", marginBottom: "5px"}}>Create Accounts</h3>
                    <Button style={{margin: "2px"}} href="/create-patient">Create a Patient</Button><br/>
                    <Button style={{margin: "2px"}} href="/create-doctor" variant="secondary">Create a Doctor</Button><br/>
                    <Button style={{margin: "2px"}} href="/create-admin" variant="success">Create an Administrator</Button><br/>
                </div>
            </div>
        </Layout>
    );
};

export default AdminProfile;