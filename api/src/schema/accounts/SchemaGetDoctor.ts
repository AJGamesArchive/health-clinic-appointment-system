import PatientViewDoctor from "../../types/data/PatientViewDoctor";

//Make interfaces based on the objects defined earlier
export interface GetDoctorHeaders {
  'content-type': string;
  'origin': string;
};
export interface GetDoctorParams {
  id: string;
};

export interface GetDoctorReply200 {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  data: PatientViewDoctor
};

export interface GetDoctorReply206 {
  title: string;
  forenames: string;
  surname: string;
  data: PatientViewDoctor
};

export interface GetDoctorReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route GET /auth/internal/patient/doctor/:id
 * @HammerCyclone
 */
const schemaGetDoctor = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    200: { //TODO Move this elsewhere when required
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        forenames: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        data: {
          type: 'object',
          properties: {
            specialty: { type: 'string' },
            upcomingAppointments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  appointmentId: { type: 'string' },
                  date: { type: 'string' },
                  time: { type: 'string' },
                  patientId: { type: 'string' },
                  patientName: { type: 'string' },
                },
                required: [
                  'appointmentId',
                  'date',
                  'time',
                  'patientId',
                  'patientName',
                ],
              },
            },
            workingHours: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: { type: 'string' },
                  startTime: { type: 'string' },
                  endTime: { type: 'string' },
                },
                required: ['day','startTime','endTime'],
              }
            },
            contactInfo: {
              type: 'object',
              properties: {
                workEmail: { type: 'string' },
                workPhone: { type: 'string' },
              },
              required: ['workEmail','workPhone'],
            }
          },
          required: [
            'specialty',
            'upcomingAppointments',
            'workingHours',
            'contactInfo',
          ],
        },
      },
      required: [
        'id',
        'title',
        'forenames',
        'surname',
        'email',
        'role',
        'createdAt',
        'updatedAt',
        'data',
      ],
    },
    206: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        forenames: { type: 'string' },
        surname: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            specialty: { type: 'string' },
            workingHours: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: { type: 'string' },
                  startTime: { type: 'string' },
                  endTime: { type: 'string' },
                },
                required: ['day','startTime','endTime'],
              }
            },
            contactInfo: {
              type: 'object',
              properties: {
                workEmail: { type: 'string' },
                workPhone: { type: 'string' },
              },
              required: ['workEmail','workPhone'],
            }
          },
          required: [
            'specialty',
            'workingHours',
            'contactInfo',
          ],
        },
      },
      required: [
        'title',
        'forenames',
        'surname',
        'data',
      ],
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      required: ['error', 'message'],
    },
    403: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      required: ['error', 'message'],
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      required: ['error', 'message'],
    },
  },
};

export default schemaGetDoctor;