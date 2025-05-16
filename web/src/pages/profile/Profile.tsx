// Imports
import "./Profile.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button, } from 'react-bootstrap';
import { UseRouteAuthHook } from "../../hooks/security/UseRouteAuth";
import DebugBlock from "../../components/utilities/DebugBlock";
import Spinner from 'react-bootstrap/Spinner';
import Layout from "../../components/ui/Layout";
import buildNum from "../../static/BuildNumber";

/**
 * React function to render the 'My Profile' page
 */
const Profile: React.FC = () => {
  // Hooks
  const auth: UseRouteAuthHook = useAuthContext();

  // Return JSX
  return (
    <Layout>
      <h1>Health Clinic Appointment Management System (version {buildNum})</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <h3>All links to pages</h3>
      <h4>Create</h4>
      <Button style={{margin: "10px"}} href="/create-patient">Create Patient</Button>
      <Button style={{margin: "10px"}} href="/create-doctor">Create Doctor</Button>
      <Button style={{margin: "10px"}} href="/create-admin">Create Admin</Button>

      <h4>Read/Update</h4>
      <Button style={{margin: "10px"}} href="/patient-profile">Patient Profile</Button>
      <Button style={{margin: "10px"}} href="/doctor-profile">Doctor Profile</Button>
      <Button style={{margin: "10px"}} href="/admin-profile">Admin Profile</Button>
      
      <Button style={{margin: "10px"}} href="/appointments">Appointment List</Button>
      
      <DebugBlock>
        {JSON.stringify(auth.user, null, 2)}
      </DebugBlock>
      <Button
        variant="danger"
        onClick={auth.logout}
        disabled={auth.loadingLogout}
      >
        {auth.loadingLogout && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        <span> Logout</span>
      </Button>
    </Layout>
  );
};

export default Profile;