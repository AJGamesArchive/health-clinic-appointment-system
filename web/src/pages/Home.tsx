// Imports
import useGetAllDoctors, { UseGetAllDoctorsHook } from "../hooks/UseGetAllDoctors";
import DebugBlock from "../components/utilities/DebugBlock";
import commonColors from "../static/Colors";
import buildNum from "../static/BuildNumber";
import { Alert } from 'react-bootstrap';
import Layout from "../components/ui/Layout";

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
      <Alert variant="primary" className="w-100">
        Bootstrap Is Installed!
      </Alert>
      <h2>{buildNum}</h2>
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