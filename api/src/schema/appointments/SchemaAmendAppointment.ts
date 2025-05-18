// Imports
import AppointmentData from "../../types/data/AppointmentData.js";

export interface AmendAppointmentHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface AmendAppointmentParams {
  id: string;
};
export interface AmendAppointmentBody extends Partial<AppointmentData> {}
export interface AmendAppointmentReply200 extends AppointmentData {}
export interface AmendAppointmentReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route PATCH /auth/internal/appointment/:id/amend
 * @AJGamesArchive
 */
const schemaAmendAppointment = {
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
  body: {
    type: 'object',
    properties: {
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
      actionsTaken: { type: 'string' },
      previousAppointmentId: { type: 'string' },
      nextAppointmentId: { type: 'string' },
      postAppointmentNotes: { type: 'string' },
    },
    required: [],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
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
        actionsTaken: { type: 'string' },
        previousAppointmentId: { type: 'string' },
        nextAppointmentId: { type: 'string' },
        postAppointmentNotes: { type: 'string' },
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

export default schemaAmendAppointment;
