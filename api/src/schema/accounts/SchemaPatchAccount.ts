import AccountData from "../../types/data/AccountData";


export interface PatchAccountHeaders {
  'content-type': string;
  'origin': string;
};


export interface PatchAccountParams {
  id: string;
};

export interface PatchAccountBody extends Partial <AccountData>{};

export interface PatchAccountReply200 {
  status: string;
  message: string;
  id: string;
  role: string;
  updatedAt: Date;
};

export interface PatchAccountReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route PATCH /auth/internal/admin/account/:id
 * @HammerCyclone
 */
const schemaPatchAccount = {
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
    additionalProperties: true,
    properties: { 
        title:      { type: 'string' },
        forenames:  { type: 'string' },
        surname:    { type: 'string' },
        email:      { type: 'string', format: 'email'},
        password:   { type: 'string' },
    },
    minProperties: 1,
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id:         { type: 'string' },
        role:       { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
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

export default schemaPatchAccount;