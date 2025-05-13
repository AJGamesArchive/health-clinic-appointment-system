import { Button } from "react-bootstrap"
const Header = () =>
    <div className="header">
        <div className="two-content-container">
            <div className="first" style={{ width: "30%" }}>
                <h4 style={{ padding: "auto"}}>Health Clinic Appointment Management System</h4>
            </div>
            <div className="second">
                <Button variant="outline-secondary">Temp button 1</Button>
                <Button variant="outline-secondary" style={{ margin: "5px" }}>Temp button 2</Button>
                <Button variant="secondary">Login/logout button</Button>
            </div>
        </div>
    </div>


export default Header