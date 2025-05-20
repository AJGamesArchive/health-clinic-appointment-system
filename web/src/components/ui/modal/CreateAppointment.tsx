import { Button, Modal, Alert } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import AppointmentData from "../../../types/data/AppointmentData";
import { useEffect, useState } from "react";
import useAPIService from "../../../hooks/services/UseAPIService";
import { useAuthContext } from "../../../contexts/AuthContext";
import DebugBlock from "../../utilities/DebugBlock";

interface props {
    visible: boolean;
    setVisible(arg0: boolean): void;
}

const CreateAppointmentModal: React.FC<props> = ({visible, setVisible}) => {
    const auth = useAuthContext();
    const [ appointment, setAppointment ] = useState<AppointmentData>({
        id: null,
        doctorId: "",
        patientId: "",
        upcoming: true,
        canceled: false,
        date: "",
        time: "",
        bookedBy: "Admin",
        preAppointmentNotes: "",
        actionsTaken: "_____",
        postAppointmentNotes: "_____",
    });
    const [ doctorString, setDoctorString ] = useState<string>("");
    const [ patientString, setPatientString ] = useState<string>("");

    useEffect(() => {
        if(!auth.user) return;
        setAppointment({
            ...appointment,
            ...((auth.user.role === "Patient") && {
                patientId: auth.user.id,
                bookedBy: "Patient",
            }),
            ...((auth.user.role === "Doctor") && {
                doctorId: auth.user.id,
                bookedBy: "Doctor",
            }),
        })
    }, [auth.user]);

    const doctorSearch = useAPIService<{
        id: string;
        title: string;
        forenames: string;
        surname: string;
    }[]>(
        "GET", `/auth/internal/accounts/Doctor/search`,
        {},
        { surname: doctorString },
        {},
        { immediate: false }
    );
    const patientSearch = useAPIService<{
        id: string;
        title: string;
        forenames: string;
        surname: string;
    }[]>(
        "GET",
        `/auth/internal/accounts/Patient/search`,
        {},
        { surname: patientString },
        {},
        { immediate: false }
    );
    const bookAppointment = useAPIService(
        'POST',
        '/auth/internal/appointments/book',
        appointment,
        {},
        {},
        { immediate: false }
    );

    return (
        <Modal show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{padding: "0 20px"}}>
                    <DebugBlock>
                        {JSON.stringify(appointment, null, 2)}
                    </DebugBlock>
                    <Form.Label>Doctor</Form.Label>
                    <div className="search-container">
                        <Form.Control
                            className="control"
                            placeholder= {auth.user?.role === 'Doctor' ? auth.user?.surname : "Enter doctor surname"}
                            disabled={auth.user?.role === 'Doctor'}
                            onChange={(e) => setDoctorString(e.target.value)}
                        />
                            <Button
                                disabled={auth.user?.role === 'Doctor' || doctorSearch.loading}
                                onClick={() => doctorSearch.reTrigger()}
                            >
                                <i
                                    className="bi bi-search">
                                </i>
                            </Button>
                    </div>
                    {doctorSearch.data && (
                        <select
                            value={appointment.doctorId}
                            onChange={(e) => setAppointment({
                                ...appointment,
                                doctorId: e.target.value
                            })}
                        >
                            <option value="">--- Select ---</option>
                            {doctorSearch.data.map((d, i) => (
                                <option key={i} value={d.id}>
                                    {`${d.title} ${d.forenames} ${d.surname}`}
                                </option>
                            ))}
                        </select>
                    )}
                    <Form.Label>Patient</Form.Label>
                    <div className="search-container">
                        <Form.Control className="control"
                     placeholder= {auth.user?.role === 'Patient' ? auth.user?.surname : "Enter patient surname"} 
                     disabled={auth.user?.role === 'Patient'}
                     onChange={(e) => setPatientString(e.target.value)}
                     />
                     <Button 
                        disabled={auth.user?.role === 'Patient' || patientSearch.loading}
                        onClick={() => patientSearch.reTrigger()}
                        >
                        <i 
                            className="bi bi-search">
                        </i>
                    </Button>
                    </div>
                    {patientSearch.data && (
                        <select 
                            value={appointment.patientId}
                            onChange={(e) => setAppointment({
                                ...appointment,
                                patientId: e.target.value
                            })}
                        >
                            <option value="">--- Select ---</option>
                            {patientSearch.data.map((p, i) => (
                                <option key={i} value={p.id}>
                                    {`${p.title} ${p.forenames} ${p.surname}`}
                                </option>
                            ))}
                        </select>
                    )}
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                    type="date"
                    onChange={(e) => setAppointment({
                        ...appointment,
                        date: e.target.value
                    })}
                    />
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time"
                    onChange={(e) => setAppointment({
                        ...appointment,
                        time: e.target.value
                    })}
                    />
                    <Form.Label>Pre-appointment notes</Form.Label>
                    <Form.Control as="textarea"
                     onChange={(e) => setAppointment({
                        ...appointment,
                        preAppointmentNotes: e.target.value
                    })}
                    />
                </Form>
                <div style={{padding: "20px 10px", textAlign: "center"}}>
                    <Button
                        variant="success"
                        disabled={bookAppointment.loading}
                        onClick={() => bookAppointment.reTrigger()}
                    >
                            Save
                    </Button>
                </div>
                {!!bookAppointment.loading && (
                    <Alert
                        variant="warning"
                    >
                        Loading...
                    </Alert>
                )}
                {bookAppointment.status === 201 && (
                    <Alert
                        variant="success"
                    >
                        {bookAppointment.message}
                    </Alert>
                )}
                {(bookAppointment.status !== 201 && bookAppointment.error) && (
                    <Alert
                        variant="danger"
                    >
                        {bookAppointment.error}
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default CreateAppointmentModal;