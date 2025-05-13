import { Button } from "react-bootstrap";

const Header = () =>
    <div className="header">
        <div className="two-content-container">
            <div className="first" style={{ width: "30%" }}>
                <h4>
                    <a href="/">Health Clinic Appointment Management System</a>
                </h4>
            </div>
            <div className="second">
                <Button variant="outline-secondary" style={{ margin: "5px" }}>Temp 1</Button>
                <Button variant="outline-secondary" style={{ margin: "5px" }}>Temp 2</Button>
                <Button variant="secondary">Login/logout button</Button>
            </div>
        </div>
    </div>


export default Header