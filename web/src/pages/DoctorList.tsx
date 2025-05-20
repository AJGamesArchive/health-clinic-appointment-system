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
        <a href={"/doctors/" + doctor.id}>
            <Card key={doctor.id} className="account-card">
                <h5>{doctor.forenames} {doctor.surname}</h5>
            </Card>
        </a>
    ));

    return (
        <Layout>
            <h2 style={{padding: "30px 0 10px"}}>Doctors <Button variant="primary" href="/create-doctor">Add new Doctor</Button> <BackButton backFactor={-1} label="Back" variant="secondary"/></h2>            
            { doctorCards.length > 0 ? 
                <div className="account-card-container">
                    {doctorCards}
                </div>
            : 
                <p>No doctors in system.</p> 
            }            
        </Layout>
    );
};

export default DoctorList;