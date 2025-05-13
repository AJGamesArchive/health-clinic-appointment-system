// Imports
import useGetAllDoctors, { UseGetAllDoctorsHook } from "../hooks/UseGetAllDoctors";
import DebugBlock from "../components/utilities/DebugBlock";
import commonColors from "../static/Colors";
import buildNum from "../static/BuildNumber";
import { Alert } from 'react-bootstrap';

/**
 * React function to render the home page
 */
const Home: React.FC = () => {
  // Hooks
  const doctors: UseGetAllDoctorsHook = useGetAllDoctors();

  // JSX
  return (
    <div>
      <img
        style={{ width: "200px", height: "200px" }}
        src="/vite.svg"
        alt="logo"
      />
      <h1>Welcome!!</h1>
      <h1>Health Clinic Appointment System</h1>
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
    </div>
  );
};

export default Home;