// Imports
import "./Profile.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button, } from 'react-bootstrap';
import { UseRouteAuthHook } from "../../hooks/security/UseRouteAuth";
import DebugBlock from "../../components/utilities/DebugBlock";
import Spinner from 'react-bootstrap/Spinner';

/**
 * React function to render the 'My Profile' page
 */
const Profile: React.FC = () => {
  // Hooks
  const auth: UseRouteAuthHook = useAuthContext();

  // JSX
  return (
    <div>
      <h1>My Profile</h1>
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
    </div>
  );
};

export default Profile;