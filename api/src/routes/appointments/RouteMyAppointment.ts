// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  MyAppointmentHeaders,
  MyAppointmentParams,
  MyAppointmentReply200,
  MyAppointmentReplyError,
} from '../../schema/appointments/SchemaMyAppointment.js';
import { JWTAccountData } from '../../types/data/AccountData.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch specific appointment data for the current user based on a given appointment id
 * @route GET /auth/internal/profile/appointment/:id
 * @AJGamesArchive
 */
const routeMyAppointment = async (
	req: FastifyRequest<{
    Headers: MyAppointmentHeaders;
    Params: MyAppointmentParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Type user
  const user = req.user as JWTAccountData;
  
  // Ensure user to not an admin
  if(user.role === "Admin") {
    rep.status(422).send(JSON.stringify({
      error: 'UNPROCESSABLE_ENTITY',
      message: 'Admin accounts do not have any appointments tied to them.',
    } as MyAppointmentReplyError, null, 2));
    return;
  };

  // Fetch appointments
  const appointment: AppointmentData | number = await AppointmentService.getOneForAccount(
    user.role,
    req.params.id,
    user.id,
  );

  // Handle error
  if(typeof appointment === 'number') {
    rep.status((appointment === 404) ? 404 : 500).send(JSON.stringify({
      error: (appointment === 404) ? 'APPOINTMENT_NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch appointments.',
      output: {
        code: appointment,
        err: null,
      },
    } as MyAppointmentReplyError, null, 2));
    return;
  };

  // Send response
  rep.status(200).send(appointment as MyAppointmentReply200);
	return;
};

export default routeMyAppointment;
