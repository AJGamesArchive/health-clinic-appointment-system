// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  PatientAppointmentHeaders,
  PatientAppointmentParams,
  PatientAppointmentReply200,
  PatientAppointmentReplyError,
} from '../../schema/appointments/SchemaPatientAppointment.js';
import AppointmentService from '../../services/database/AppointmentService.js';
import AppointmentData from '../../types/data/AppointmentData.js';

/**
 * @summary Route to fetch specific appointment data for a given patient based on a given appointment id
 * @route GET /auth/internal/doctor/patient/:patientId/appointment/:appointmentId
 * @note Doctor Endpoint
 * @AJGamesArchive
 */
const routePatientAppointment = async (
	req: FastifyRequest<{
    Headers: PatientAppointmentHeaders;
    Params: PatientAppointmentParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
  // Fetch appointments
  const appointment: AppointmentData | number = await AppointmentService.getOneForAccount(
    "Patient",
    req.params.appointmentId,
    req.params.patientId,
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
    } as PatientAppointmentReplyError, null, 2));
    return;
  };

  // Send response
  rep.status(200).send(appointment as PatientAppointmentReply200);
	return;
};

export default routePatientAppointment;
