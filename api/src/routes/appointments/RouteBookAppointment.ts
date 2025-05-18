// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  BookMyAppointmentHeaders,
  BookMyAppointmentBody,
  BookMyAppointmentReply201,
  BookMyAppointmentReplyError,
} from '../../schema/appointments/SchemaBookAppointment.js';
import { JWTAccountData } from '../../types/data/AccountData.js';
import AppointmentTransaction from '../../services/database/AppointmentTransaction.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to an appointment for your self
 * @route POST /auth/internal/appointments/book
 * @note All Users Endpoint
 * @AJGamesArchive
 */
const routeBookAppointment = async (
	req: FastifyRequest<{
    Headers: BookMyAppointmentHeaders;
    Body: BookMyAppointmentBody;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Type user
  const user = req.user as JWTAccountData;

  // Ensurer has permission to book the requested appointment
  let reject: boolean = false;
  if(user.role === "Doctor" && (req.body.doctorId !== user.id)) reject = true;
  if(user.role === "Patient" && (req.body.patientId !== user.id)) reject = true;
  if(reject) {
    rep.status(403).send(JSON.stringify({
      error: 'FORBIDDEN',
      message: 'You are not allowed to book this appointment.',
      output: {
        code: 403,
        err: `You cannot book appointments for other ${user.role}s.`,
      },
    } as BookMyAppointmentReplyError, null, 2));
    return;
  };

  // Book appointment
  const appointment: AppointmentTransaction | number = await AppointmentTransaction.initCreateTransaction(req.body);

  // Handle init error
  if(typeof appointment === 'number') {
    rep.status(500).send({
      error: 'FAILED_TO_INIT_TRANSACTION',
      message: 'Failed to book appointment.',
      output: {
        code: appointment,
        err: 'Failed to retrieve entities required for the creations to be initiated.',
      },
    } as BookMyAppointmentReplyError);
    return;
  };

  // Process transaction
  const applied: boolean = await appointment.applyTransaction();
  if(!applied) {
    rep.status(422).send({
      error: 'FAILED_TO_APPLY_TRANSACTION',
      message: 'Failed to book appointment.',
      output: {
        code: 422,
        err: appointment.getErrors(),
      },
    } as BookMyAppointmentReplyError);
    return;
  };

  // Commit transaction
  const committed: boolean = await appointment.commitTransaction();
  if(!committed) {
    rep.status(500).send({
      error: 'FAILED_TO_COMMIT_TRANSACTION',
      message: 'Failed to book appointment.',
      output: {
        code: 500,
        err: appointment.getErrors(),
      },
    } as BookMyAppointmentReplyError);
  };

  // Return confirmation
  const bookedApp: AppointmentData = appointment.getAppointment();
  const doctor = appointment.getDoctor();
  const patient = appointment.getPatient();
  rep.status(201).send({
    message: 'Appointment booked successfully.',
    appointment: {
      id: bookedApp.id,
      doctor,
      patient,
      date: bookedApp.date,
      time: bookedApp.time,
    },
  } as BookMyAppointmentReply201);
	return;
};

export default routeBookAppointment;
