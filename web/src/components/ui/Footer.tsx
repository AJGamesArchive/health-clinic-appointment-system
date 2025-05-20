import buildNum from "../../static/BuildNumber"

const Footer = () =>
    <div className="footer-container">
        <div className="footer">
            <h5>HCAMS</h5>
            <h5>Health Clinic Appointment Management System</h5>
            <p>Prototype Health Clinic Appointment Management System developed for the Canterbury Christ Church University Advanced Databases and Big Data Assessment 2 Group Project (module code U14440).</p>
            <h4>Contact Support</h4>
            <p>Developers' contact details are as follows:</p>
            <ul style={{paddingLeft: "18px"}}>
                <li>Jessica Excell: <a href="mailto:je398@canterbury.ac.uk" style={{color: "white"}}>je398@canterbury.ac.uk</a></li>
                <li>Ethan McGuinness: <a href="mailto:em814@canterbury.ac.uk" style={{color: "white"}}>em814@canterbury.ac.uk</a></li>
                <li>Alfie Skinner: <a href="mailto:as2679@canterbury.ac.uk" style={{color: "white"}}>as2679@canterbury.ac.uk</a></li>
                <li>Alex Ward: <a href="mailto:aw949@canterbury.ac.uk" style={{color: "white"}}>aw949@canterbury.ac.uk</a></li>
            </ul>
            <p style={{textAlign: "center"}}>2025 Health Clinic Appointment Management System (version {buildNum}).<br/>Do not redistribute.</p>
        </div>
    </div>


export default Footer