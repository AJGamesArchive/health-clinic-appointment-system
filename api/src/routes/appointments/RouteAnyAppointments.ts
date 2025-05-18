// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  AnyAppointmentsHeaders,
  AnyAppointmentsParams,
  AnyAppointmentsQuerystring,
  AnyAppointmentsReply200,
  AnyAppointmentsReplyError,
} from '../../schema/appointments/SchemaAnyAppointments.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch appointment data for the current user
 * @route GET /auth/internal/admin/appointments/:type
 * @AJGamesArchive
 */
const routeAnyAppointments = async (
	req: FastifyRequest<{
    Headers: AnyAppointmentsHeaders;
    Params: AnyAppointmentsParams;
    Querystring: AnyAppointmentsQuerystring;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Ensure valid filters are passed
  if(
    (req.query.role && !req.query.userId) ||
    (!req.query.role && req.query.userId)
  ) {
    rep.status(400).send(JSON.stringify({
      error: 'BAD_REQUEST',
      message: `Invalid query parameters. Must pass either both or neither of 'role' and 'userId'.`,
    } as AnyAppointmentsReplyError, null, 2));
    return;
  };

  // Fetch appointments
  const appointments: AppointmentData[] | number = await AppointmentService.getMany(
    req.query.page ?? 1,
    50,
    req.query.sort,
    (req.query.role && req.query.userId) ? {
      role: req.query.role,
      id: req.query.userId,
    } : undefined,
    req.params.type,
  );

  // Handle error
  if(typeof appointments === 'number') {
    rep.status((appointments === 404) ? 404 : 500).send(JSON.stringify({
      error: (appointments === 404) ? 'NO_APPOINTMENTS_FOUND' : 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch appointments.',
      output: {
        code: appointments,
        err: null,
      },
    } as AnyAppointmentsReplyError, null, 2));
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
  } as AnyAppointmentsReply200, null, 2));
	return;
};

export default routeAnyAppointments;
