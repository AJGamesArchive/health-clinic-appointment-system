import React, { useState, useEffect } from "react";
import accountData from "../../types/data/AccountData";
import "./UpcomingAppointmentsPatients.css";

interface Appointment {
  appointmentId: string;
  doctorName: string;
  date: string;
  time: string;
}

interface upcomingAppointmentsPatients {
  accountData: accountData;
}

const UpcomingAppointmentsPatients: React.FC<upcomingAppointmentsPatients> = ({accountData}) => {
   
   const appointments: Appointment[] = accountData?.patientData?.upcomingAppointments || [];

   
    return (
        <div className="core-information">
        <div className="upcoming-appointments">
            <h2>Upcoming Appointments</h2>
            <div className="appointments-list">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div className="appointment-card" key={appointment.appointmentId}>
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
