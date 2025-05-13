import { Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";

const UpcomingAppointments: React.FC = () => {
    const tempAppointmentData = [
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

    const tempAppointmentCards = tempAppointmentData.map((appointment) => {
        return (
            <Card>
                <h5>Appointment with {appointment.doctorName}</h5>
                <p style={{margin: 0}}>Date: {appointment.date}</p>
                <p style={{margin: 0}}>Time: {appointment.time}</p>
            </Card>
        );
    });

    // const tempAppointmentCards = null
    // Uncomment this to see view with no appointments

    return (
        <Layout>
            <h1>Upcoming Appointments</h1>
            { tempAppointmentCards ? 
                tempAppointmentCards 
            : 
                <p>You don't have any upcoming appointments.</p> }
            
        </Layout>
    );
};

export default UpcomingAppointments;