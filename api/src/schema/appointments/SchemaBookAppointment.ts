// Imports
import AppointmentData from "../../types/data/AppointmentData.js";

export interface BookMyAppointmentHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface BookMyAppointmentBody extends AppointmentData {}
export interface BookMyAppointmentReply201 {
  message: string;
  appointment: {
    id: string;
    doctor: {
      id: string;
      title: string;
      forenames: string;
      surname: string;
    };
    patient: {
      id: string;
      title: string;
      forenames: string;
      surname: string;
    };
    date: string;
    time: string;
  };
};
export interface BookMyAppointmentReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route POST /auth/internal/appointments/book
 * @AJGamesArchive
 */
const schemaBookAppointment = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        default: null,
        nullable: true,
      },
      doctorId: { type: 'string' },
      patientId: { type: 'string' },
      upcoming: { type: 'boolean' },
      canceled: { type: 'boolean' },
      date: { type: 'string' },
      time: { type: 'string' },
      bookedBy: { type: 'string' },
      bookedAt: { type: 'string' },
      updatedAt: { type: 'string' },
      vitals: {
        type: 'object',
        properties: {
          height: { type: 'string' },
          weight: { type: 'string' },
          bloodPressure: { type: 'string' },
          heartRate: { type: 'string' },
          temperature: { type: 'string' },
          additionalProperties: false,
        },
        required: [],
      },
      preAppointmentNotes: { type: 'string' },
      actionsTaken: {
        type: 'string',
        default: "",
      },
      previousAppointmentId: { type: 'string' },
      nextAppointmentId: { type: 'string' },
      postAppointmentNotes: {
        type: 'string',
        default: "",
      },
    },
    required: [
      'id',
      'doctorId',
      'patientId',
      'upcoming',
      'canceled',
      'date',
      'time',
      'bookedBy',
      'preAppointmentNotes',
      'actionsTaken',
      'postAppointmentNotes'
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        appointment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            doctor: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                forenames: { type: 'string' },
                surname: { type: 'string' },
              },
              required: ['id', 'title', 'forenames', 'surname'],
            },
            patient: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                forenames: { type: 'string' },
                surname: { type: 'string' },
              },
              required: ['id', 'title', 'forenames', 'surname'],
            },
            date: { type: 'string' },
            time: { type: 'string' },
          },
          required: [
            'id',
            'doctorId',
            'patientId',
            'date',
            'time',
          ],
        },
      },
      required: ['message', 'appointment'],
    },
    403: {
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

export default schemaBookAppointment;
