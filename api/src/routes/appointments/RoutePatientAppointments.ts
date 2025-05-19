// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  PatientAppointmentsHeaders,
  PatientAppointmentsParams,
  PatientAppointmentsQuerystring,
  PatientAppointmentsReply200,
  PatientAppointmentsReplyError,
} from '../../schema/appointments/SchemaPatientAppointments.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch appointment data for a given patient
 * @route GET /auth/internal/doctor/patient/:patientId/appointments/:type
 * @note Doctor Endpoint
 * @AJGamesArchive
 */
const routePatientAppointments = async (
	req: FastifyRequest<{
    Headers: PatientAppointmentsHeaders;
    Params: PatientAppointmentsParams;
    Querystring: PatientAppointmentsQuerystring;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Fetch appointments
  const appointments: AppointmentData[] | number = await AppointmentService.getManyByUserId(
    "Patient",
    req.params.patientId,
    req.params.type,
    req.query.page ?? 1,
    50,
    req.query.sort,
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
    } as PatientAppointmentsReplyError, null, 2));
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
  rep.status(200).send({
    appointments: (req.params.type === "all" && req.query.split) ? undefined : appointments,
    upcomingAppointments: upcomingAppointments,
    pastAppointments: pastAppointments,
  } as PatientAppointmentsReply200);
	return;
};

export default routePatientAppointments;
