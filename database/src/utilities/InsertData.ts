// Imports
import mongoose from "mongoose";
import DB_Accounts from "../schemas/Accounts.js";
import DB_Appointments from "../schemas/Appointment.js";
import DB_MedicalHistory from "../schemas/MedicalHistory.js";
import Tomato from "../classes/Tomato.js";
import AccountData from "../types/data/AccountData.js";
import AppointmentData from "../types/data/AppointmentData.js";
import MedicalHistoryData from "../types/data/MedicalHistoryData.js";

/**
 * Function to handle inserting data into the database and updating all corresponding IDs
 * @param data - The data to insert into the database
 * @param data.patients - The patients to insert into the database
 * @param data.doctors - The doctors to insert into the database
 * @param data.admins - The admins to insert into the database
 * @param data.appointments - The appointments to insert into the database
 * @param data.medicalHistories - The medical history data to insert into the database
 * @param localDB - Flag to indicate if the database is local or not
 * @note Function will not use a transaction is database is local
 * @returns {Promise<void>} - A promise that resolves when the data has been inserted
 * @throws {Tomato} - Throws a Tomato error if the data could not be inserted
 * @description This function inserts data into the database and updates all corresponding IDs. It uses a transaction to ensure that all data is inserted successfully or none at all.
 */
async function insertData(
  data: {
    patients: AccountData[];
    doctors: AccountData[];
    admins: AccountData[];
    appointments: AppointmentData[];
    medicalHistories: MedicalHistoryData[];
  },
  localDB?: boolean,
): Promise<void> {
  // Setup DB transaction
  const session = await mongoose.startSession();
  if(!localDB) session.startTransaction();

  // DB Opts
  try  {
    // Deconstruct passed data object
    const { patients, doctors, admins, appointments } = data;

    // Insert accounts
    console.log("Inserting patients...");
    const patientInsertionsPromises = await DB_Accounts.insertMany(patients.map((p) => ({
      title: p.title,
      forenames: p.forenames,
      surname: p.surname,
      email: p.email,
      password: p.password,
      role: p.role,
      accountData: p.patientData,
    })), { session: (!localDB) ? session : undefined });
    console.log("Inserting doctors...");
    const doctorInsertionsPromises = await DB_Accounts.insertMany(doctors.map((d) => ({
      title: d.title,
      forenames: d.forenames,
      surname: d.surname,
      email: d.email,
      password: d.password,
      role: d.role,
      accountData: d.doctorData,
    })), { session: (!localDB) ? session : undefined });
    console.log("Inserting admins...");
    const adminInsertionsPromises = await DB_Accounts.insertMany(admins.map((a) => ({
      title: a.title,
      forenames: a.forenames,
      surname: a.surname,
      email: a.email,
      password: a.password,
      role: a.role,
      accountData: a.adminData,
    })), { session: (!localDB) ? session : undefined });
    console.log("Awaiting promises...");
    const [ patientInsertions, doctorInsertions, adminInsertions ] = await Promise.all([
      patientInsertionsPromises,
      doctorInsertionsPromises,
      adminInsertionsPromises,
    ]);
    console.log("Accounts inserted!")

    // Map account IDs
    const patientIdMap = new Map(
      patients.map((patient, index) => [patient.id, patientInsertions[index]._id.toString()])
    );
    const doctorIdMap = new Map(
      doctors.map((doctor, index) => [doctor.id, doctorInsertions[index]._id.toString()])
    );
    const adminIdMap = new Map(
      admins.map((admin, index) => [admin.id, adminInsertions[index]._id.toString()])
    );

    // Replace UUIDs in appointments with MongoDB IDs
    const updatedAppointments = appointments.map((appointment) => ({
      ...appointment,
      patientId: patientIdMap.get(appointment.patientId),
      doctorId: doctorIdMap.get(appointment.doctorId),
    }));

    // Insert appointments
    console.log("Inserting appointments...");
    const appointmentInsertions = await DB_Appointments.insertMany(updatedAppointments.map((app) => ({
      doctorId: app.doctorId,
      patientId: app.patientId,
      upcoming: app.upcoming,
      canceled: app.canceled,
      date: app.date,
      time: app.time,
      bookedBy: app.bookedBy,
      bookedAt: app.bookedAt,
      updatedAt: app.updatedAt,
      vitals: {
        height: app.vitals?.height,
        weight: app.vitals?.weight,
        bloodPressure: app.vitals?.bloodPressure,
        heartRate: app.vitals?.heartRate,
        temperature: app.vitals?.temperature,
      },
      preAppointmentNotes: app.preAppointmentNotes,
      actionsTaken: app.actionsTaken,
      previousAppointmentId: app.previousAppointmentId,
      nextAppointmentId: app.nextAppointmentId,
      postAppointmentNotes: app.postAppointmentNotes,
    })), { session: (!localDB) ? session : undefined });
    console.log("Appointments inserted!");

    // Map appointment IDs
    const appointmentIdMap = new Map(
      appointments.map((appointment, index) => [appointment.id, appointmentInsertions[index]._id.toString()])
    );

    // Replace UUIDs in medical history with MongoDB IDs
    const updatedMedicalHistories = data.medicalHistories.map((history) => ({
      ...history,
      patient: {
        ...history.patient,
        patientId: patientIdMap.get(history.patient.patientId),
      },
      entryBy: {
        ...history.entryBy,
        doctorId: doctorIdMap.get(history.entryBy.doctorId),
      },
    }));

    // Insert medical history
    console.log("Inserting medical history...");
    const medicalHistoryInsertions = await DB_MedicalHistory.insertMany(updatedMedicalHistories.map((history) => ({
      patient: {
        patientId: history.patient.patientId,
        patientName: history.patient.patientName,
      },
      entryBy: {
        doctorId: history.entryBy.doctorId,
        doctorName: history.entryBy.doctorName,
      },
      createdAt: history.createdAt,
      updatedAt: history.updatedAt,
      details: history.details,
    })), { session: (!localDB) ? session : undefined });
    console.log("Medical history inserted!");

    // Map medical history IDs
    const medicalHistoryIdMap = new Map(
      data.medicalHistories.map((history, index) => [history.id, medicalHistoryInsertions[index]._id.toString()])
    );

    // Map upcoming appointments into the patients and doctors
    console.log("Updating referenced indexes...")
    for(const appointment of updatedAppointments) {
      // Update next and previous appointment IDs in database if applicable
      if(appointment.previousAppointmentId && appointment.nextAppointmentId) {
        const nextAppointmentId = appointmentIdMap.get(appointment.nextAppointmentId);
        const previousAppointmentId = appointmentIdMap.get(appointment.previousAppointmentId);
        if(nextAppointmentId && previousAppointmentId) {
          await DB_Appointments.findByIdAndUpdate(appointmentIdMap.get(appointment.id), {
            $set: {
              nextAppointmentId: nextAppointmentId,
              previousAppointmentId: previousAppointmentId,
            },
          }, { session: (!localDB) ? session : undefined });
        };
      };

      // Guard to ensure only upcoming appointments are added
      if(!appointment.upcoming) continue;

      // Fetch patient and doctor data
      const patient = patientInsertions
        .map((pi) => ({
          id: pi._id.toString(),
          title: pi.title,
          forenames: pi.forenames,
          surname: pi.surname,
        }))
        .find((p) => p.id === appointment.patientId);
      const doctor = doctorInsertions
        .map((di) => ({
          id: di._id.toString(),
          title: di.title,
          forenames: di.forenames,
          surname: di.surname,
        }))
        .find((d) => d.id === appointment.doctorId);

      // Ensure all required data is present
      if(!patient) throw new Tomato("Patient not found");
      if(!doctor) throw new Tomato("Doctor not found");
      if(!appointment.id) throw new Tomato("Appointment ID not found");
      if(!appointment.patientId) throw new Tomato("Patient ID not found");
      if(!appointment.doctorId) throw new Tomato("Doctor ID not found");

      // Add appointment to patient and doctor data
      const patientApp = {
        appointmentId: appointmentIdMap.get(appointment.id),
        date: appointment.date,
        time: appointment.time,
        doctorId: appointment.doctorId,
        doctorName: `${doctor.title} ${doctor.forenames} ${doctor.surname}`,
      };
      const doctorApp = {
        appointmentId: appointmentIdMap.get(appointment.id),
        date: appointment.date,
        time: appointment.time,
        patientId: appointment.patientId,
        patientName: `${patient.title} ${patient.forenames} ${patient.surname}`,
      };

      // Update patient and doctor data in database
      await DB_Accounts.findByIdAndUpdate(appointment.patientId, {
        $push: { "accountData.upcomingAppointments": patientApp },
      }, { session: (!localDB) ? session : undefined });
      await DB_Accounts.findByIdAndUpdate(appointment.doctorId, {
        $push: { "accountData.upcomingAppointments": doctorApp },
      }, { session: (!localDB) ? session : undefined });
    };
    console.log("Referenced indexes updated!");

    // Commit transaction
    if(!localDB) await session.commitTransaction();
    if(!localDB) session.endSession();

    // Log created IDs
    console.log("Created IDs:");
    console.log("Patients:");
    patients.forEach((patient) => {
      console.log(`  ${patient.id} -> ${patientIdMap.get(patient.id)}`);
    });
    console.log("Doctors:");
    doctors.forEach((doctor) => {
      console.log(`  ${doctor.id} -> ${doctorIdMap.get(doctor.id)}`);
    });
    console.log("Admins:");
    admins.forEach((admin) => {
      console.log(`  ${admin.id} -> ${adminIdMap.get(admin.id)}`);
    });
    console.log("Appointments:");
    appointments.forEach((appointment) => {
      console.log(`  ${appointment.id} -> ${appointmentIdMap.get(appointment.id)}`);
    });
    console.log("Medical histories:");
    data.medicalHistories.forEach((history) => {
      console.log(`  ${history.id} -> ${medicalHistoryIdMap.get(history.id)}`);
    });
    return;
  } catch (err: any) {
    if(!localDB) await session.abortTransaction();
    if(!localDB) session.endSession();
    throw new Tomato(`Failed to insert data into the database: ${err}`);
  };
  return;
};

export default insertData;