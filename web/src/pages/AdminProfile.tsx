import Layout from "../components/ui/Layout";
import { Badge, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useAdminProfile } from "../hooks/UseAdminProfile";

const AdminProfile: React.FC = () => {
    const adminProfile = useAdminProfile();

    if(!adminProfile.profile.data) return (
        <div>
            {adminProfile.profile.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {adminProfile.profile.error && (
                <div>
                    Error occurred: {adminProfile.profile.error}
                </div>
            )}
        </div>
    );

    // There should be a check here to see if a patient or doctor has tried to 
    // access this page (or someone who is logged out)
    return (
        <Layout>
            <h2>{adminProfile.profile.data?.forenames} {adminProfile.profile.data.surname}<Badge style={{margin: "0 10px", }} bg="success">Admin</Badge></h2>
            <Form>
                <Form.Label>Title</Form.Label>
                <Form.Select value={adminProfile.modifiedProfile?.title} onChange={(e) => adminProfile.updateField("title", e.target.value)} disabled={adminProfile.updateDisabled}>
                    <option>select a title</option>
                    <option>Ms</option>
                    <option>Mr</option>
                    <option>Mx</option>
                    <option>Mrs</option>
                    <option>Miss</option>
                </Form.Select>
                <Form.Label>Forename</Form.Label>
                <Form.Control placeholder="forename" value={adminProfile.modifiedProfile?.forenames} onChange={(e) => adminProfile.updateField("forenames", e.target.value)} disabled={adminProfile.updateDisabled}/>
                <Form.Label>Surname</Form.Label>
                <Form.Control placeholder="surname" value={adminProfile.modifiedProfile?.surname} onChange={(e) => adminProfile.updateField("surname", e.target.value)} disabled={adminProfile.updateDisabled}/>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={adminProfile.modifiedProfile?.email} onChange={(e) => adminProfile.updateField("email", e.target.value)} disabled={adminProfile.updateDisabled}/>
                <Form.Label>Role</Form.Label>
                <Form.Control value={adminProfile.modifiedProfile?.adminData?.staffRole} onChange={(e) => adminProfile.updateField("adminData", e.target.value, "staffRole")} disabled={adminProfile.updateDisabled}/>

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
        </Layout>
    );
};

export default AdminProfile;