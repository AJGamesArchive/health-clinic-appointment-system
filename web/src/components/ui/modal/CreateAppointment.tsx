import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import AppointmentData from "../../../types/data/AppointmentData";
import { useState } from "react";

interface props {
    visible: boolean;
    setVisible(arg0: boolean): void;
}

const CreateAppointmentModal: React.FC<props> = ({visible, setVisible}) => {
    const [ appointment, setAppointment ] = useState<AppointmentData>();
    const [ doctorString, setDoctorString ] = useState<string>();
    const [ patientString, setPatientString ] = useState<string>();

    return (
        <Modal show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{padding: "0 20px"}}>
                    <Form.Label>Doctor</Form.Label>
                    <div className="search-container">
                        <Form.Control className="control" placeholder="Enter doctor surname"/><Button><i className="bi bi-search"></i></Button>
                    </div>
                    <Form.Label>Patient</Form.Label>
                    <div className="search-container">
                        <Form.Control className="control" placeholder="Enter patient surname"/><Button><i className="bi bi-search"></i></Button>
                    </div>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"/>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time"/>
                    <Form.Label>Pre-appointment notes</Form.Label>
                    <Form.Control as="textarea"/>
                </Form>
                <div style={{padding: "20px 10px", textAlign: "center"}}>
                    <Button variant="success">Save</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CreateAppointmentModal;