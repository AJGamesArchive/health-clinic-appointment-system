import AccountData from "../../types/data/AccountData";

export interface PostAccountHeaders {
  'content-type': string;
  'origin': string;
};

export interface PostAccountBody extends AccountData{};

export interface PostAccountReply201 {
  status: string;
  message: string;
  id: string;
  role: string;
  createdAt: Date;
};

export interface PostAccountReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route POST /auth/internal/admin/account/
 * @HammerCyclone
 */
const schemaPostAccount = {
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
    additionalProperties: false,
    properties: { 
      title:        { type: 'string' },
      forenames:    { type: 'string' },
      surname:      { type: 'string' },
      email:        { type: 'string', format: 'email'},
      password:     { type: 'string' },
      role:         { type: 'string', enum: ['Patient', 'Doctor', 'Admin']},
      gender:       { type: 'string'},
      dateOfBirth:  { type: 'string'},
    },
    minProperties: 8,
  },
  response: {
    201: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id:         { type: 'string' },
        role:       { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
        createdAt:  { type: 'string', format: 'date-time' },
      },
      required: ['id', 'role', 'createdAt'],
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

export default schemaPostAccount;