import AdminData from "../../types/data/AdminData";

export interface PatchAdminHeaders {
  'content-type': string;
  'origin': string;
};

export interface PatchAdminParams {
  id: string;
};

export interface PatchAdminBody extends Partial <AdminData>{};

export interface PatchAdminReply200 {
  status:     string;
  message:    string;
  id:         string;
  updatedAt:  Date;
};

export interface PatchAdminReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route PATCH /auth/internal/admin/admin/:id
 * @HammerCyclone
 */
const schemaPatchAdmin = {
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
      staffRole:  { type: 'string' },
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
      required: ['id', 'updatedAt'],
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

export default schemaPatchAdmin;