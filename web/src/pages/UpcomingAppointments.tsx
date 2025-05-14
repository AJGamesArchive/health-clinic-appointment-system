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

    interface DetailAppointmentData {            
        appointmentId: string,
        date: string,
        time: string,
        doctorId: string,
        doctorName: string,
        patientId: string,
        patientName: string,
        createdAt: string,
        updatedAt: string,

        vitals: {
            height: string,
            weight: string,
            temperature: string,
            heartRate: string,
            bloodPressure: string,
        },
        preAppointmentNotes: string,
        postAppointmentNotes: string,
        actionsTaken: string,
    };
    
    const tempAppointmentData: AppointmentData[] = [
        { 
            appointmentId: "0",
            date: "2025-05-12",
            time: "10:00",
            doctorId: "1",
            doctorName: "Dr Jane Smith"
        },
        { 
            appointmentId: "1",
            date: "2025-05-12",
            time: "12:00",
            doctorId: "2",
            doctorName: "Dr John Smith"
        },
        { 
            appointmentId: "2",
            date: "2025-05-13",
            time: "10:00",
            doctorId: "1",
            doctorName: "Dr Jane Smith"
        },
    ];
    const [ selectedAppointment, setSelectedAppointment ] = useState<DetailAppointmentData | undefined>(undefined);

    function handleUpdateVisible(appointment : AppointmentData) {
        // Get actual data
        
        // Add extra data by hand for time being (normally would use get on appointment ID to 
        // get full appointment data)
        const fullData: DetailAppointmentData = {...appointment, 
            patientId: "1",
            patientName: "Jane Smith",
            createdAt: "2025-05-12", 
            updatedAt: "2025-05-13",
            vitals: {
                bloodPressure: "",
                height: "",
                weight: "",
                heartRate: "",
                temperature: ""
            },
            preAppointmentNotes: "Patient is dying",
            postAppointmentNotes: "Patient is dead",
            actionsTaken: "N/A"
        }
        setSelectedAppointment(fullData);
        setUpdateVisible(true);
    };

    const tempAppointmentCards = tempAppointmentData.map((appointment) => (
        <Card key={appointment.appointmentId} onClick={() => handleUpdateVisible(appointment)}>
            <h5>Appointment with {appointment.doctorName}</h5>
            <p style={{margin: 0}}>Date: {appointment.date}</p>
            <p style={{margin: 0}}>Time: {appointment.time}</p>
        </Card>
    ));

    // Uncomment this to see view with no appointments    
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