// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  MyAppointmentsHeaders,
  MyAppointmentsParams,
  MyAppointmentsQuerystring,
  MyAppointmentsReply200,
  MyAppointmentsReplyError,
} from '../../schema/appointments/SchemaMyAppointments.js';
import { JWTAccountData } from '../../types/data/AccountData.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch appointment data for the current user
 * @route GET /auth/internal/profile/appointments/:type
 * @note Patient & Doctor Endpoint
 * @AJGamesArchive
 */
const routeMyAppointments = async (
	req: FastifyRequest<{
    Headers: MyAppointmentsHeaders;
    Params: MyAppointmentsParams;
    Querystring: MyAppointmentsQuerystring;
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
    } as MyAppointmentsReplyError, null, 2));
    return;
  };

  // Fetch appointments
  const appointments: AppointmentData[] | number = await AppointmentService.getManyByUserId(
    user.role,
    user.id,
    req.params.type,
    req.query.page ?? 1,
    50,
    req.query.sort,
  );

  // Handle error
  if(typeof appointments === 'number') {
    rep.status(500).send(JSON.stringify({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch appointments.',
      output: {
        code: appointments,
        err: null,
      },
    } as MyAppointmentsReplyError, null, 2));
    return;
  };

  // Split appointments if requested
  let upcomingAppointments: AppointmentData[] | undefined;
  let pastAppointments: AppointmentData[] | undefined;
  if(req.params.type === 'all' && req.query.split) {
    upcomingAppointments = appointments.filter((appointment) => appointment.upcoming);
    pastAppointments = appointments.filter((appointment) => !appointment.upcoming);
  };

  // Send response
  rep.status(200).send(JSON.stringify({
    appointments: req.params.type === 'all' ? undefined : appointments,
    upcomingAppointments: req.params.type === 'all' ? upcomingAppointments : undefined,
    pastAppointments: req.params.type === 'all' ? pastAppointments : undefined,
  } as MyAppointmentsReply200, null, 2));
	return;
};

export default routeMyAppointments;
