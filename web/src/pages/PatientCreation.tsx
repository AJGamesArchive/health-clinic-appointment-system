import Layout from "../components/ui/Layout";
import { Alert, Badge, Button, Toast  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";
import { usePatientCreation } from "../hooks/UsePatientCreation";
import BackButton from "../components/core/BackButton";

const PatientCreation: React.FC = () => {
    const patientCreation = usePatientCreation();

    return (
        <Layout>
            <div>
                <Toast className="toast" bg="danger" show={patientCreation.toastVisible} onClose={() => patientCreation.setToastVisible(false)}>
                    <Toast.Header style={{backgroundColor: "#9C1C28", color: "white"}}><strong className="me-auto">Error</strong></Toast.Header>
                    <Toast.Body style={{color: "white"}}>{patientCreation.toastMessage}</Toast.Body>
                </Toast>
                <h2>Create Account <Badge style={{margin: "0 10px"}} >Patient</Badge></h2>
                <Form>
                    <h3>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={patientCreation.patient.email} onChange={(e) => patientCreation.updatePatient("email", e.target.value)}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={patientCreation.patient.password} onChange={(e) => patientCreation.updatePatient("password", e.target.value)}/>
                    { patientCreation.patient.password && <PasswordStrengthChecker password={patientCreation.patient.password} setPasswordStrength={patientCreation.setPasswordStrength}/>}
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="repeat password" value={patientCreation.confirmPassword} onChange={(e) => patientCreation.setConfirmPassword(e.target.value)}/>
                    { patientCreation.confirmPassword && patientCreation.patient.password !== patientCreation.confirmPassword && <Alert variant="danger" style={{marginTop: "10px"}}>Error: Passwords do not match.</Alert>}
                    
                    <h3>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={patientCreation.patient.title} onChange={(e) => patientCreation.updatePatient("title", e.target.value)}>
                        <option>Select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={patientCreation.patient.forename} onChange={(e) => patientCreation.updatePatient("forename", e.target.value)}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={patientCreation.patient.surname} onChange={(e) => patientCreation.updatePatient("surname", e.target.value)}/>
                    
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={patientCreation.patient.dateOfBirth} onChange={(e) => {patientCreation.updatePatient("dateOfBirth", e.target.value); patientCreation.updateAge(e.target.value)}} />
                    <Form.Label>Age</Form.Label>
                    <Form.Control disabled value={patientCreation.age}/>
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Select value={patientCreation.patient.bloodType} onChange={(e) => patientCreation.updatePatient("bloodType", e.target.value)}>
                        <option>Select a blood type</option>
                        <option>A</option>
                        <option>B</option>
                        <option>O</option>
                        <option>AB</option>

                    </Form.Select>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={patientCreation.patient.gender} onChange={(e) => patientCreation.updatePatient("gender", e.target.value)}>
                        <option>Select a gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </Form.Select>
                    { patientCreation.patient.gender 
                        && patientCreation.patient.gender !== "Female"
                        && patientCreation.patient.gender !== "Male"
                        && patientCreation.patient.gender !== "Select a gender"
                        && <>
                        <Form.Label>Please enter gender</Form.Label>
                        <Form.Control placeholder="Gender" value={patientCreation.patient.gender} onChange={(e) => patientCreation.updatePatient("gender", e.target.value)}/>
                    </>}
                    <Form.Label>Conditions</Form.Label>
                    <Form.Control as="textarea" value={patientCreation.patient.conditions} onChange={(e) => patientCreation.updatePatient("conditions", e.target.value)}/>
                    <Form.Label>Allergies</Form.Label>
                    <Form.Control as="textarea" value={patientCreation.patient.allergies} onChange={(e) => patientCreation.updatePatient("allergies", e.target.value)}/>

                    <h3>Contact Information</h3>
                    <p style={{fontWeight: "700", margin: "20px auto 0"}}>Personal Contact Information</p>
                    <Form.Label>Personal Phone</Form.Label>
                    <Form.Control type="number" value={patientCreation.patient.contactPhone} onChange={(e) => patientCreation.updatePatient("contactPhone", e.target.value)}/>
                    <Form.Label>Personal Email</Form.Label>
                    <Form.Control type="email" value={patientCreation.patient.contactEmail} onChange={(e) => patientCreation.updatePatient("contactEmail", e.target.value)}/>
                    
                    <p style={{fontWeight: "700", margin: "20px auto 0"}}>Address</p>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control value={patientCreation.patient.address.addressLine1} onChange={(e) => patientCreation.updatePatient("address", e.target.value, "addressLine1")}/>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control value={patientCreation.patient.address.addressLine2} onChange={(e) => patientCreation.updatePatient("address", e.target.value, "addressLine2")}/>
                    <Form.Label>City</Form.Label>
                    <Form.Control value={patientCreation.patient.address.city} onChange={(e) => patientCreation.updatePatient("address", e.target.value, "city")}/>
                    <Form.Label>County</Form.Label>
                    <Form.Control value={patientCreation.patient.address.county} onChange={(e) => patientCreation.updatePatient("address", e.target.value, "county")}/>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control value={patientCreation.patient.address.postCode} onChange={(e) => patientCreation.updatePatient("address", e.target.value, "postCode")}/>

                    <p style={{fontWeight: "700", margin: "20px auto 0"}}>Emergency Contact Information</p>
                    <Form.Label>Emergency Contact Email</Form.Label>
                    <Form.Control type="email" value={patientCreation.patient.emergencyContactEmail} onChange={(e) => patientCreation.updatePatient("emergencyContactEmail", e.target.value)}/>
                    <Form.Label>Emergency Contact Phone</Form.Label>
                    <Form.Control type="number" value={patientCreation.patient.emergencyContactPhone} onChange={(e) => patientCreation.updatePatient("emergencyContactPhone", e.target.value)}/>
                    <Form.Label>Emergency Contact Relationship</Form.Label>
                    <Form.Select value={patientCreation.patient.emergencyContactRelationship} onChange={(e) => patientCreation.updatePatient("emergencyContactRelationship", e.target.value)}>
                        <option>Select a relationship</option>
                        <option>Parent</option>
                        <option>Other family relative</option>
                        <option>Friend</option>
                        <option>Partner</option>
                    </Form.Select>

                    <div style={{textAlign: "center", paddingTop: "20px"}}>
                        <BackButton backFactor={-1} variant="secondary" label="Cancel"/>
                        <Button variant="success" style={{margin: "10px"}} onClick={patientCreation.saveProfile}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default PatientCreation;