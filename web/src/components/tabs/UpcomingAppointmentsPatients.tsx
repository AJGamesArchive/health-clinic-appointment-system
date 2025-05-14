import React, { useState, useEffect } from "react";
import "./UpcomingAppointmentsPatients.css";

interface Appointment {
    appointmentId: { _id: string };
    date: string;
    time: string;
    doctorId: { _id: string };
    doctorName: string;
}

const UpcomingAppointmentsPatients: React.FC = () => {
   
    const [appointments, setAppointments] = useState<Appointment[]>([]);

   
    useEffect(() => {
        
        const fetchAppointments = async () => {
            // Example data, replace with actual API data
            const mockData: Appointment[] = [
                {
                    appointmentId: { _id: "1" },
                    date: "2025-05-20",
                    time: "09:00 AM",
                    doctorId: { _id: "d1" },
                    doctorName: "Dr. Smith",
                },
                {
                    appointmentId: { _id: "2" },
                    date: "2025-05-22",
                    time: "02:00 PM",
                    doctorId: { _id: "d2" },
                    doctorName: "Dr. Johnson",
                },
                
            ];
            setAppointments(mockData);
        };

        fetchAppointments();
    }, []);

    return (
        <div className="core-information">
        <div className="upcoming-appointments">
            <h2>Upcoming Appointments</h2>
            <div className="appointments-list">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div className="appointment-card" key={appointment.appointmentId._id}>
                            <h3>{appointment.doctorName}</h3>
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.time}</p>
                        </div>
                    ))
                ) : (
                    <p>No upcoming appointments</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default UpcomingAppointmentsPatients;
