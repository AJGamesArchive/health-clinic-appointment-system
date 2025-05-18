// Imports
import AppointmentData from "../../types/data/AppointmentData.js";

export interface PatientAppointmentsHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface PatientAppointmentsParams {
  patientId: string;
  type: 'upcoming' | 'past' | 'all' | 'cancelled';
};
export interface PatientAppointmentsQuerystring {
  page?: number;
  sort: 'asc' | 'desc';
  split: boolean;
};
export interface PatientAppointmentsReply200 {
  appointments?: AppointmentData[];
  upcomingAppointments?: AppointmentData[];
  pastAppointments?: AppointmentData[];
};
export interface PatientAppointmentsReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route GET /auth/internal/doctor/patient/:patientId/appointments/:type
 * @AJGamesArchive
 */
const schemaPatientAppointments = {
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
      patientId: { type: 'string' },
      type: { type: 'string', enum: ['upcoming', 'past', 'all', 'cancelled'] },
    },
    required: ['patientId', 'type'],
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      sort: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'asc',
      },
      split: {
        type: 'boolean',
        default: false,
      },
    },
    required: ['sort'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        appointments: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true,
          },
        },
        upcomingAppointments: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true,
          },
        },
        pastAppointments: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
      required: [],
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        additionalProperties: true,
      },
      required: ['error', 'message'],
    },
    422: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        additionalProperties: true,
      },
      required: ['error', 'message'],
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        additionalProperties: true,
      },
      required: ['error', 'message'],
    },
  },
};

export default schemaPatientAppointments;