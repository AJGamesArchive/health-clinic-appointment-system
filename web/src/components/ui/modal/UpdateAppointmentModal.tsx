import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./UpdateAppointmentModal.css"
import { useEffect, useState } from "react";

interface props {
    visible: boolean;
    setVisible(arg0: boolean): void;
    selectedAppointment: appointmentInterface
};

// This might have to be changed to make vitals fields string | undefined later
// or we might use a global appointment interface idk
interface appointmentInterface {
    appointmentId: string;
    date: string;
    time: string;
    doctorId: string;
    doctorName: string;
    patientId: string;
    patientName: string;
    createdAt: string;
    updatedAt: string;
    vitals: {
        height: string;
        weight: string;
        temperature: string;
        heartRate: string;
        bloodPressure: string;
    };
    preAppointmentNotes: string;
    postAppointmentNotes: string;
    actionsTaken: string;
};

interface accountObj {
    name: string;
    id: string;
}

const UpdateAppointmentModal: React.FC<props> = ({visible, setVisible, selectedAppointment}) => {
    // Saved all appointment data under 1 usestate because if not there would have been about
    // 10 hooks - this means the spread thing (this -> {...appointment, variable: newValue}) is
    // used to update individual fields in appointment
    const [ appointment, setAppointment ] = useState<appointmentInterface>(selectedAppointment)

    // This is needed because changing the appointment (selectedAppointment) in 
    // UpcomingAppointments.tsx doesn't update the default created value for appointment above
    // (because the component has already rendered i think?) so this monitors selectedAppointment
    // for changes instead 😊
    useEffect(() => {
        setAppointment(selectedAppointment);
    }, [selectedAppointment]);


    // Temporary data for doctors (when backend is done this will be replaced by actually
    // getting a list of all the doctors)
    const tempDoctors: accountObj[] = [
        { name: appointment.doctorName, id: appointment.doctorId},
        { name: "doctor 2", id: "jfdksal;"}
    ];

    // Update both the doctor's ID and name when another doctor is selected
    function updateDoctor(id : string) {
        var newDoc = tempDoctors.find(doctor => doctor.id === id);
        if (newDoc) { setAppointment({...appointment, doctorId: newDoc.id, doctorName: newDoc.name}); };
    };

    return (
        <Modal show={visible} onHide={() => setVisible(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Update Appointment (id: {appointment.appointmentId})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="two-content-container" style={{flexWrap: "wrap"}}>
                    <div className="box">
                        <Form>
                            <h5 className="section-header">Booking</h5>
                            <div className="two-content-container">
                                <div className="multi-content">
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Select value={appointment.doctorId} onChange={(e) => { updateDoctor(e.target.value) }}>
                                    <option>Select a doctor</option>
                                    {tempDoctors.map(doctor => <option value={doctor.id} key={doctor.id}>{doctor.name}</option>)}
                                    </Form.Select>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={appointment.date} onChange={(e) => setAppointment({...appointment, date: e.target.value})}/>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" value={appointment.time} onChange={(e) => setAppointment({...appointment, time: e.target.value})}/>
                                </div>
                                <div className="final-multi-content">
                                    <Form.Label>Patient</Form.Label>
                                    <Form.Control value={appointment.patientName} disabled/>
                                    <Form.Label>Booked At</Form.Label>
                                    <Form.Control type="date" value={appointment.createdAt} disabled/>
                                    <Form.Label>Updated At</Form.Label>
                                    <Form.Control type="date" value={appointment.updatedAt} disabled/>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="box">
                        <Form>
                            <h5 className="section-header">Vitals</h5>
                            <div className="two-content-container">
                                <div className="multi-content">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control 
                                        value={appointment.vitals?.height} 
                                        onChange={(e) => setAppointment({...appointment, vitals: {...appointment.vitals, height: e.target.value}})}/>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control 
                                        value={appointment.vitals?.weight} 
                                        onChange={(e) => setAppointment({...appointment, vitals: {...appointment.vitals, weight: e.target.value}})}/>
                                    <Form.Label>Temperature</Form.Label>
                                    <Form.Control 
                                        value={appointment.vitals?.temperature} 
                                        onChange={(e) => setAppointment({...appointment, vitals: {...appointment.vitals, temperature: e.target.value}})}/>
                                </div>
                                <div className="final-multi-content">
                                    <Form.Label>Heart Rate</Form.Label>
                                    <Form.Control 
                                        value={appointment.vitals?.heartRate} 
                                        onChange={(e) => setAppointment({...appointment, vitals: {...appointment.vitals, heartRate: e.target.value}})}/>
                                    <Form.Label>Blood Pressure</Form.Label>
                                    <Form.Control 
                                        value={appointment.vitals?.bloodPressure} 
                                        onChange={(e) => setAppointment({...appointment, vitals: {...appointment.vitals, bloodPressure: e.target.value}})}/>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="box" >
                    <h5 className="section-header">Notes</h5>
                    <div className="two-content-container" style={{flexWrap: "wrap"}}>
                        <div className="multi-content">
                            <Form.Label>Pre-appointment Notes</Form.Label>
                            <Form.Control 
                                as="textarea" value={appointment.preAppointmentNotes} 
                                onChange={(e) => setAppointment({...appointment, preAppointmentNotes: e.target.value})}/>
                        </div>
                        <div className="multi-content">
                            <Form.Label>Post-appointment Notes</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                value={appointment.postAppointmentNotes} onChange={(e) => setAppointment({...appointment, postAppointmentNotes: e.target.value})}/>
                        </div>
                        <div className="final-multi-content">
                            <Form.Label>Actions Taken</Form.Label>
                            <Form.Control 
                                as="textarea" value={appointment.actionsTaken} 
                                onChange={(e) => setAppointment({...appointment, actionsTaken: e.target.value})}/>
                        </div>
                    </div>
                </div>
                
                <div className="button-set-container">
                    <Button variant="success" className="button-wrapper">Save</Button>
                    <Button variant="danger" className="button-wrapper">Cancel Appointment</Button>
                    <Button variant="info" className="button-wrapper">Schedule Follow-Up Appointment</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateAppointmentModal;