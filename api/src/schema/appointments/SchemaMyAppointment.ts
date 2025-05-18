// Imports
import AppointmentData from "../../types/data/AppointmentData.js";

export interface MyAppointmentHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface MyAppointmentParams {
  id: string;
};
export interface MyAppointmentReply200 extends AppointmentData {}
export interface MyAppointmentReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route GET /auth/internal/profile/appointment/:id
 * @AJGamesArchive
 */
const schemaMyAppointment = {
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

export default schemaMyAppointment;
