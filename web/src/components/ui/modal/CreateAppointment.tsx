import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

interface props {
    visible: boolean;
    setVisible(arg0: boolean): void;
}

const CreateAppointmentModal: React.FC<props> = ({visible, setVisible}) => {
    return (
        <Modal show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{padding: "0 20px"}}>
                    <Form.Label>Doctor</Form.Label>
                    <Form.Select>
                        <option>Select a doctor</option>
                    </Form.Select>
                    <Form.Label>Patient</Form.Label>
                    <Form.Select>
                        <option>Select a patient</option>
                    </Form.Select>
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