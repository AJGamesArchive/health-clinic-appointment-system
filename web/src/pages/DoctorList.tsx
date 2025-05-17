import { Button, Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import { useDoctorList } from "../hooks/UseDoctorList";
import BackButton from "../components/core/BackButton";

const DoctorList: React.FC = () => {
    const doctors = useDoctorList();

    if (!doctors.data) return (
        <div>
            {doctors.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {doctors.error && (
                <div>
                    Error occurred: {doctors.error}
                </div>
            )}
        </div>
    )

    const doctorCards = doctors.data.map((doctor) => (
        <Card key={doctor.id} onClick={() => console.log("Open doctor with ID " + doctor.id)}>
            <h5>{doctor.forenames} {doctor.surname}</h5>
        </Card>
    ));

    return (
        <Layout>
            <h2>Doctors <Button variant="primary" href="/create-doctor">Add new Doctor</Button> <BackButton backFactor={-1} label="Back" variant="secondary"/></h2>            
            { doctorCards.length > 0 ? 
                doctorCards
            : 
                <p>No doctors in system.</p> 
            }            
        </Layout>
    );
};

export default DoctorList;