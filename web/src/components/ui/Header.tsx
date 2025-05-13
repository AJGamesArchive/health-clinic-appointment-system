import { Button } from "react-bootstrap"
import "../../App.css"
const Header = () =>
    <div className="header">
        <div className="two-content-container">
            <div className="individual-content">
                <h4 style={{ padding: "auto"}}>Health Clinic Appointment Management System</h4>
            </div>
            <div className="individual-content" style={{ textAlign:"right" }}>
                <Button variant="outline-secondary">Patients??? but this should change</Button>
                <Button variant="outline-secondary" style={{ marginLeft: "10px" }}>Appointments</Button>
                <Button variant="secondary" style={{ marginLeft: "10px" }}>Logout</Button>
            </div>
        </div>
    </div>


export default Header