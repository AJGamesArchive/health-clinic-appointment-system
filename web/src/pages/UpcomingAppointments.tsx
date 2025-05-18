import { Button, Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import { useState } from "react";
import CreateAppointmentModal from "../components/ui/modal/CreateAppointment";
import UpdateAppointmentModal from "../components/ui/modal/UpdateAppointmentModal";
import AppointmentData from "../types/data/AppointmentData";
import { useAppointments } from "../hooks/UseAppointments";
import { useAuthContext } from "../contexts/AuthContext";
import { UseRouteAuthHook } from "../hooks/security/UseRouteAuth";

const UpcomingAppointments: React.FC = () => {
    const [ createVisible, setCreateVisible ] = useState<boolean>(false);
    const [ updateVisible, setUpdateVisible ] = useState<boolean>(false);
    const [ selectedAppointment, setSelectedAppointment] = useState<AppointmentData>();
    const appointments = useAppointments("all");

    if (!appointments.data) return (
        <div>
            {appointments.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {appointments.error && (
                <div>
                    Error occurred: {appointments.error}
                </div>
            )}
        </div>
    );

    function handleUpdateVisible(appointment : AppointmentData) {
        setUpdateVisible(true);
        setSelectedAppointment(appointment);
    }

    const appointmentsArray = appointments.data as AppointmentData[]
    console.log(appointmentsArray)

    const tempAppointmentCards = appointmentsArray.length > 0 
        ? (appointmentsArray).map((appointment) => (
            <Card key={appointment.id} onClick={() => handleUpdateVisible(appointment)}>
                <h5>Appointment with [UNKNOWN]</h5>
                <p style={{margin: 0}}>Date: {appointment.date}</p>
                <p style={{margin: 0}}>Time: {appointment.time}</p>
            </Card>
        ))
        : null;

    // // Uncomment this to see view with no appointments
    // const tempAppointmentCards = null

    return (
        <Layout>
            <CreateAppointmentModal visible={createVisible} setVisible={setCreateVisible}/>
            { selectedAppointment && <UpdateAppointmentModal visible={updateVisible} setVisible={setUpdateVisible} selectedAppointment={selectedAppointment}/>}

            <h2>Upcoming Appointments <Button variant="primary" onClick={() => setCreateVisible(true)}>Book Appointment</Button></h2>
            { tempAppointmentCards ?
                tempAppointmentCards
            :
                <p>You don't have any upcoming appointments.</p>
            }
        </Layout>
    );
};

export default UpcomingAppointments;