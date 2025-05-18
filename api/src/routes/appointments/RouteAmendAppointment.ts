// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  AmendAppointmentHeaders,
  AmendAppointmentParams,
  AmendAppointmentBody,
  AmendAppointmentReply200,
  AmendAppointmentReplyError,
} from '../../schema/appointments/SchemaAmendAppointment.js';
import { JWTAccountData } from '../../types/data/AccountData.js';
import AppointmentTransaction from '../../services/database/AppointmentTransaction.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to amend an one of your appointments
 * @route PATCH /auth/internal/appointment/:id/amend
 * @note All Users Endpoint
 * @note Admins can amend any appointment
 * @AJGamesArchive
 */
const routeAmendAppointment = async (
	req: FastifyRequest<{
    Headers: AmendAppointmentHeaders;
    Params: AmendAppointmentParams;
    Body: AmendAppointmentBody;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Type user
  const user = req.user as JWTAccountData;

  // Ensurer has permission to book the requested appointment
  let reject: boolean = false;
  if(user.role === "Doctor" && (!!req.body.doctorId || !!req.body.patientId)) reject = true;
  if(user.role === "Patient" && !!req.body.patientId) reject = true;
  if(reject) {
    rep.status(403).send(JSON.stringify({
      error: 'FORBIDDEN',
      message: 'You are not allowed to book this appointment.',
      output: {
        code: 403,
        err: `You cannot book appointments for other ${user.role}s.`,
      },
    } as AmendAppointmentReplyError, null, 2));
    return;
  };

  // Book appointment
  const transaction: AppointmentTransaction | number = await AppointmentTransaction.initAmendTransaction("Update" , req.params.id);

  // Handle init error
  if(typeof transaction === 'number') {
    rep.status(500).send({
      error: 'FAILED_TO_INIT_TRANSACTION',
      message: 'Failed to amend appointment.',
      output: {
        code: transaction,
        err: 'Failed to retrieve entities required for the creations to be initiated.',
      },
    } as AmendAppointmentReplyError);
    return;
  };

  // Ensure users have permission to amend the given appointment
  const appointment: AppointmentData = transaction.getAppointment();
  if(user.role === "Doctor" && (appointment.doctorId !== user.id)) reject = true;
  if(user.role === "Patient" && (appointment.patientId !== user.id)) reject = true;
  if(reject) {
    rep.status(403).send(JSON.stringify({
      error: 'FORBIDDEN',
      message: 'You are not allowed to amend this appointment.',
      output: {
        code: 403,
        err: `You cannot amend other users appointments.`,
      },
    } as AmendAppointmentReplyError, null, 2));
    return;
  };

  // Queue amendments
  const queued: boolean = transaction.queueUpdates(req.body);
  if(!queued) {
    rep.status(422).send({
      error: 'FAILED_TO_QUEUE_UPDATES',
      message: 'Failed to amend appointment.',
      output: {
        code: 422,
        err: transaction.getErrors(),
      },
    } as AmendAppointmentReplyError);
    return;
  };

  // Process transaction
  const applied: boolean = await transaction.applyTransaction();
  if(!applied) {
    rep.status(422).send({
      error: 'FAILED_TO_APPLY_TRANSACTION',
      message: 'Failed to amend appointment.',
      output: {
        code: 422,
        err: transaction.getErrors(),
      },
    } as AmendAppointmentReplyError);
    return;
  };

  // Commit transaction
  const committed: boolean = await transaction.commitTransaction();
  if(!committed) {
    rep.status(500).send({
      error: 'FAILED_TO_COMMIT_TRANSACTION',
      message: 'Failed to amend appointment.',
      output: {
        code: 500,
        err: transaction.getErrors(),
      },
    } as AmendAppointmentReplyError);
  };

  // Return confirmation
  const AmendedApp: AppointmentData = transaction.getAppointment();
  rep.status(200).send(AmendedApp as AmendAppointmentReply200);
	return;
};

export default routeAmendAppointment;
