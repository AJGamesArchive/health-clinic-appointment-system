// Imports
import mongoose from "mongoose";

/**
 * Appointment Vitals Schema
 * @AJGamesArchive
 */
const vitalsSchema = new mongoose.Schema({
  height: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  bloodPressure: {
    type: String,
    required: false,
  },
  heartRate: {
    type: String,
    required: false,
  },
  temperature: {
    type: String,
    required: false,
  },
}, { _id: false });

/**
 * Appointments schema
 * @AJGamesArchive
 */
const appointmentsSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  canceled: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bookedBy: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient', 'Admin'],
  },
  bookedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  vitals: {
    type: vitalsSchema,
    required: false,
  },
  preAppointmentNotes: {
    type: String,
    required: true,
  },
  actionsTaken: {
    type: String,
    required: true,
  },
  previousAppointmentId: {
    type: String,
    required: false,
  },
  nextAppointmentId: {
    type: String,
    required: false,
  },
  postAppointmentNotes: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

/**
 * Appointments model
 * @AJGamesArchive
 */
const DB_Appointments = mongoose.model('appointments', appointmentsSchema);

export default DB_Appointments;