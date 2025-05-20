import { Button, Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import { usePatientList } from "../hooks/UsePatientList";
import BackButton from "../components/core/BackButton";

const PatientList: React.FC = () => {
    const patients = usePatientList();

    if (!patients.data) return (
        <div>
            {patients.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {patients.error && (
                <div>
                    Error occurred: {patients.error}
                </div>
            )}
        </div>
    )

    const patientCards = patients.data.map((patient) => (
        <Card key={patient.id} className="account-card" onClick={() => console.log("Open patient with ID " + patient.id)}>
            <h5>{patient.forenames} {patient.surname}</h5>
        </Card>
    ));

    return (
        <Layout>
            <h2 style={{padding: "30px 0 10px"}}>Patients <Button variant="primary" href="/create-patient">Add new Patient</Button> <BackButton backFactor={-1} label="Back" variant="secondary"/></h2>            
            { patientCards.length > 0 ? 
                <div className="account-card-container">
                    {patientCards}
                </div>
            : 
                <p>No patients in system.</p> 
            }            
        </Layout>
    );
};

export default PatientList;