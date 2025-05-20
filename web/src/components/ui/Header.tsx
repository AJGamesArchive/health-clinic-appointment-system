import { Button, Spinner } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { UseRouteAuthHook } from "../../hooks/security/UseRouteAuth";

const Header = () => {
  const auth: UseRouteAuthHook = useAuthContext();

  return (
    <div className="header">
      <div className="two-content-container">
        <div className="first">
          <h4>Health Clinic Appointment Management System</h4>
        </div>
        <div className="second">
          { auth.user?.role === "Admin" && 
            <>
            <Button
                variant="outline-secondary"
                style={{ margin: "5px" }}
                href="/admins"
              >
                Administrators
              </Button>
              <Button
                variant="outline-secondary"
                style={{ margin: "5px" }}
                href="/doctors"
              >
                Doctors
              </Button>
              <Button
                variant="outline-secondary"
                style={{ margin: "5px" }}
                href="/patients"
              >
                Patients
              </Button>
            </>}
            { auth.user?.role === "Doctor" &&
              <Button
                variant="outline-secondary"
                style={{ margin: "5px" }}
                href="/patients"
              >
                Patients
              </Button>
            }
          <Button
            variant="outline-secondary"
            style={{ margin: "5px" }}
            href="/profile"
          >
            Profile
          </Button>
          <Button
            variant="outline-secondary"
            style={{ margin: "5px" }}
            href="/appointments"
          >
            Appointments
          </Button>
          <Button
            variant="secondary"
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
      </div>
    </div>
  );
};

export default Header;
