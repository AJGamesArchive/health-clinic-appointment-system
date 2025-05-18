// Imports
import AppointmentData from "../../types/data/AppointmentData.js";

export interface AnyAppointmentsHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface AnyAppointmentsParams {
  type: 'upcoming' | 'past' | 'all' | 'cancelled';
};
export interface AnyAppointmentsQuerystring {
  page?: number;
  sort: 'asc' | 'desc';
  split: boolean;
  role?: 'Doctor' | 'Patient';
  userId?: string;
};
export interface AnyAppointmentsReply200 {
  appointments?: AppointmentData[];
  upcomingAppointments?: AppointmentData[];
  pastAppointments?: AppointmentData[];
};
export interface AnyAppointmentsReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route GET /auth/internal/admin/appointments/:type
 * @AJGamesArchive
 */
const schemaAnyAppointments = {
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
      type: { type: 'string', enum: ['upcoming', 'past', 'all', 'cancelled'] },
    },
    required: ['type'],
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
      role: {
        type: 'string',
        enum: ['Doctor', 'Patient'],
      },
      userId: {
        type: 'string',
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
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        additionalProperties: true,
      },
      required: ['error', 'message'],
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

export default schemaAnyAppointments;