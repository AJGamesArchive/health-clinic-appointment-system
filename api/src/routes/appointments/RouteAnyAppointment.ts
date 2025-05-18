// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  AnyAppointmentHeaders,
  AnyAppointmentParams,
  AnyAppointmentReply200,
  AnyAppointmentReplyError,
} from '../../schema/appointments/SchemaAnyAppointment.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch specific appointment data based on a given appointment id
 * @route GET /auth/internal/admin/appointment/:id
 * @AJGamesArchive
 */
const routeAnyAppointment = async (
	req: FastifyRequest<{
    Headers: AnyAppointmentHeaders;
    Params: AnyAppointmentParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Fetch appointments
  const appointment: AppointmentData | number = await AppointmentService.getOne(req.params.id);

  // Handle error
  if(typeof appointment === 'number') {
    rep.status((appointment === 404) ? 404 : 500).send(JSON.stringify({
      error: (appointment === 404) ? 'APPOINTMENT_NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch appointments.',
      output: {
        code: appointment,
        err: null,
      },
    } as AnyAppointmentReplyError, null, 2));
    return;
  };

  // Send response
  rep.status(200).send(appointment as AnyAppointmentReply200);
	return;
};

export default routeAnyAppointment;
