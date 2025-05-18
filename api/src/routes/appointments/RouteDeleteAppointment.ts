// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  DeleteAppointmentHeaders,
  DeleteAppointmentParams,
  DeleteAppointmentReply200,
  DeleteAppointmentReplyError,
} from '../../schema/appointments/SchemaDeleteAppointment.js';
import AppointmentTransaction from '../../services/database/AppointmentTransaction.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to completely delete an appointment from the system
 * @route DELETE /auth/internal/admin/appointment/:id
 * @note Admin Endpoint
 * @AJGamesArchive
 */
const routeDeleteAppointment = async (
	req: FastifyRequest<{
    Headers: DeleteAppointmentHeaders;
    Params: DeleteAppointmentParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Book appointment
  const transaction: AppointmentTransaction | number = await AppointmentTransaction.initAmendTransaction("Delete" , req.params.id);

  // Handle init error
  if(typeof transaction === 'number') {
    rep.status(500).send({
      error: 'FAILED_TO_INIT_TRANSACTION',
      message: 'Failed to delete appointment.',
      output: {
        code: transaction,
        err: 'Failed to retrieve entities required for the deletion to be initiated.',
      },
    } as DeleteAppointmentReplyError);
    return;
  };

  // Process transaction
  const applied: boolean = await transaction.applyTransaction();
  if(!applied) {
    rep.status(422).send({
      error: 'FAILED_TO_APPLY_TRANSACTION',
      message: 'Failed to delete appointment.',
      output: {
        code: 422,
        err: transaction.getErrors(),
      },
    } as DeleteAppointmentReplyError);
    return;
  };

  // Commit transaction
  const committed: boolean = await transaction.commitTransaction();
  if(!committed) {
    rep.status(500).send({
      error: 'FAILED_TO_COMMIT_TRANSACTION',
      message: 'Failed to delete appointment.',
      output: {
        code: 500,
        err: transaction.getErrors(),
      },
    } as DeleteAppointmentReplyError);
  };

  // Return confirmation
  const deletedApp: AppointmentData = transaction.getAppointment();
  rep.status(200).send(deletedApp as DeleteAppointmentReply200);
	return;
};

export default routeDeleteAppointment;
