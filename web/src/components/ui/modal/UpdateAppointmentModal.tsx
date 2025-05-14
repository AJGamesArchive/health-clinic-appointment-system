import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./UpdateAppointmentModal.css"

interface props {
    visible: boolean;
    setVisible(arg0: boolean): void;
    appointment: {
        appointmentId: string;
        date: string;
        time: string;
        doctorId: string;
        doctorName: string;
        patientId: string;
        patientName: string;
    };
};

const UpdateAppointmentModal: React.FC<props> = ({visible, setVisible, appointment}) => {
    
    return (
        <Modal show={visible} onHide={() => setVisible(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Update Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="two-content-container" style={{flexWrap: "wrap"}}>
                    <div className="box">
                        <Form>
                            <h5 className="section-header">Booking</h5>
                            <div className="two-content-container">
                                <div className="multi-content">
                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Select>
                                        <option>{appointment.doctorName}</option>
                                    </Form.Select>
                                    <Form.Label>Patient</Form.Label>
                                    <Form.Select>
                                        <option>{appointment.patientName}</option>
                                    </Form.Select>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder={appointment.date}/>
                                </div>
                                <div className="final-multi-content">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" placeholder={appointment.time}/>
                                    <Form.Label>Booked By</Form.Label>
                                    <Form.Control type="date"/>
                                    <Form.Label>Updated At</Form.Label>
                                    <Form.Control/>
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
                                    <Form.Control/>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control/>
                                    <Form.Label>Temperature</Form.Label>
                                    <Form.Control/>
                                </div>
                                <div className="final-multi-content">
                                    <Form.Label>Heart Rate</Form.Label>
                                    <Form.Control/>
                                    <Form.Label>Blood Pressure</Form.Label>
                                    <Form.Control/>
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
                            <Form.Control as="textarea"/>
                        </div>
                        <div className="multi-content">
                            <Form.Label>Post-appointment Notes</Form.Label>
                            <Form.Control as="textarea"/>
                        </div>
                        <div className="final-multi-content">
                            <Form.Label>Actions Taken</Form.Label>
                            <Form.Control as="textarea"/>
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