// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import Doctors from '../../database/Doctors.js';

/**
 * Route to return all doctors in the system
 */
const routeGetAllDOctors = async (
	_req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	// Try and fetch all doctors
	try {
		const doctors = await Doctors.find();
		rep.status(200).send(doctors);
	} catch (err: any) {
		rep.status(500).send({
			message: "Failed to fetch all doctors",
			error: err.message,
		});
	};
	return;
};

export default routeGetAllDOctors;
