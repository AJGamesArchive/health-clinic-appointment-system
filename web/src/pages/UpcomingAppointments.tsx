import { Button, Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import { useState } from "react";
import CreateAppointmentModal from "../components/ui/modal/CreateAppointment";
import UpdateAppointmentModal from "../components/ui/modal/UpdateAppointmentModal";

const UpcomingAppointments: React.FC = () => {
    const [ createVisible, setCreateVisible ] = useState<boolean>(false);
    const [ updateVisible, setUpdateVisible ] = useState<boolean>(false);
    
    interface AppointmentData {
        appointmentId: string,
        date: string,
        time: string,
        doctorId: string,
        doctorName: string
    };
    
    const tempAppointmentData: AppointmentData[] = [
        { 
            appointmentId: "0",
            date: "2025-05-12",
            time: "10.00 AM",
            doctorId: "1",
            doctorName: "Dr Jane Smith"
        },
        { 
            appointmentId: "1",
            date: "2025-05-12",
            time: "12.00 PM",
            doctorId: "2",
            doctorName: "Dr John Smith"
        },
        { 
            appointmentId: "2",
            date: "2025-05-13",
            time: "10.00 AM",
            doctorId: "1",
            doctorName: "Dr Jane Smith"
        },
    ];
    const [ selectedAppointment, setSelectedAppointment ] = useState<AppointmentData>(tempAppointmentData[0]);

    const tempAppointmentCards = tempAppointmentData.map((appointment) => {
        return (
            <Card key={appointment.appointmentId} onClick={() => setUpdateVisible(true)}>
                <h5>Appointment with {appointment.doctorName}</h5>
                <p style={{margin: 0}}>Date: {appointment.date}</p>
                <p style={{margin: 0}}>Time: {appointment.time}</p>
            </Card>
        );
    });

    // const tempAppointmentCards = null
    // Uncomment this to see view with no appointments

    function handleUpdateVisible(id: string) {
        const selectedAppointment = tempAppointmentData.find(x => x.appointmentId === id);
        if (!selectedAppointment) {
            return;
        };
        setSelectedAppointment(selectedAppointment);
        setUpdateVisible(true);
    }

    return (
        <Layout>
            <CreateAppointmentModal visible={createVisible} setVisible={setCreateVisible}/>
            <UpdateAppointmentModal visible={updateVisible} setVisible={setUpdateVisible} appointment={{...selectedAppointment, patientId: "1", patientName: "Test"}}/>
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