// Imports
import "./Profile.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { UseRouteAuthHook } from "../../hooks/security/UseRouteAuth";
import AdminProfile from "../AdminProfile";
import DoctorProfile from "../DoctorProfile";
import PatientPage from "../PatientProfile";

/**
 * React function to render the 'My Profile' page
 */
const Profile: React.FC = () => {
  // Hooks
  const auth: UseRouteAuthHook = useAuthContext();

  switch (auth.user?.role) {
    case "Admin":
      return <AdminProfile />;
    case "Doctor":
      return <DoctorProfile />;
    case "Patient":
      return <PatientPage />;
  }
};

export default Profile;