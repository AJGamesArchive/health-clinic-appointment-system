import DoctorData from "../../types/data/DoctorData";

export interface PatchDoctorHeaders {
  'content-type': string;
  'origin': string;
};

export interface PatchDoctorParams {
  id: string;
};

export interface PatchDoctorBody extends Partial <DoctorData>{};

export interface PatchDoctorReply200 {
  status:     string;
  message:    string;
  id:         string;
  updatedAt:  Date;
};

export interface PatchDoctorReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route PATCH /auth/internal/admin/doctor/:id
 * @HammerCyclone
 */
const schemaPatchDoctor = {
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
    additionalProperties: false, 
    properties: {
      speciality: { type: 'string' },
      workingHours: {
        type: 'array',
        items: {
          type: 'object',
          additionalPropterties:false,
          properties: {
            day:        { type: 'string' },
            startTime:  { type: 'string' },
            endTime:    { type: 'string' },
          },
        },
      },
      contactInfo: {
        type: 'object',
        additionalPropterties:false,
        properties: {
          workEmail:  { type: 'string' },
          workPhone:  { type: 'string' },
        },
      },
    },
    minProperties: 1,        
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id:         { type: 'string' },
        updatedAt:  { type: 'string', format: 'date-time' },
      },
      required: ['id', 'role', 'updatedAt'],
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
    }
  },
};

export default schemaPatchDoctor;