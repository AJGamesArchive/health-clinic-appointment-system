// Imports
import useGetAllDoctors, { UseGetAllDoctorsHook } from "../hooks/UseGetAllDoctors";
import DebugBlock from "../components/utilities/DebugBlock";
import commonColors from "../static/Colors";
import buildNum from "../static/BuildNumber";
import Layout from "../components/ui/Layout";
import { Button } from "react-bootstrap";

/**
 * React function to render the home page
 */
const Home: React.FC = () => {
  // Hooks
  const doctors: UseGetAllDoctorsHook = useGetAllDoctors();

  // JSX
  return (
    <Layout>
      <h1>Health Clinic Appointment Management System (version {buildNum})</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <h3>All links to pages</h3>
      <Button style={{margin: "10px"}} href="/patient-profile">Patient Profile</Button>
      <Button style={{margin: "10px"}} href="/doctor-profile">Doctor Profile</Button>
      <Button style={{margin: "10px"}} href="/admin-profile">Admin Profile</Button>
      <Button style={{margin: "10px"}} href="/create-doctor">Create Doctor</Button>
      <Button style={{margin: "10px"}} href="/create-admin">Create Admin</Button>
      <Button style={{margin: "10px"}} href="/appointments">Appointment List</Button>
      
      {doctors.loading && (
        <h3 style={{ color: commonColors.Yellow }}>
          Loading Doctor Data...
        </h3>
      )}
      {doctors.error && (
        <h3 style={{ color: commonColors.Red }}>
          {doctors.error}
        </h3>
      )}
      {doctors.data.length > 0 && (
        <DebugBlock>
          {JSON.stringify(doctors.data, null, 2)}
        </DebugBlock>
      )}
    </Layout>
  );
};

export default Home;