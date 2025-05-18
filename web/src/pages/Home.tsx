import { Button, Spinner } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import DebugBlock from "../components/utilities/DebugBlock";
import buildNum from "../static/BuildNumber";
import { useAuthContext } from "../contexts/AuthContext";
import { UseRouteAuthHook } from "../hooks/security/UseRouteAuth";

const HomePage: React.FC = () => {
  // Hooks
  const auth: UseRouteAuthHook = useAuthContext();
  
  return (
    <Layout>
      <h1>Health Clinic Appointment Management System (version {buildNum})</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <h3>All links to pages</h3>
      <h4>Create Views</h4>
      <Button style={{ margin: "10px" }} href="/create-patient">
        Create Patient
      </Button>
      <Button style={{ margin: "10px" }} href="/create-doctor">
        Create Doctor
      </Button>
      <Button style={{ margin: "10px" }} href="/create-admin">
        Create Admin
      </Button>
      <br/>
      <p style={{paddingBottom: "10px"}}>There is also an ability to add appointments under appointment list but this is a modal not a page</p>

      <h4>Read/Update/Delete Views</h4>
      <Button style={{ margin: "10px" }} href="/patient-profile">
        Patient Profile
      </Button>
      <Button style={{ margin: "10px" }} href="/doctor-profile">
        Doctor Profile
      </Button>
      <Button style={{ margin: "10px" }} href="/admin-profile">
        Admin Profile
      </Button>

    <h4>List Views</h4>
      <Button style={{ margin: "10px" }} href="/appointments">
        Appointment List
      </Button>
      <Button style={{ margin: "10px" }} href="/patients">
        Patient List
      </Button>
      <Button style={{ margin: "10px" }} href="/doctors">
        Doctors List
      </Button>
      <Button style={{ margin: "10px" }} href="/admins">
        Admins List
      </Button>

      <DebugBlock>{JSON.stringify(auth.user, null, 2)}</DebugBlock>
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

export default HomePage;
