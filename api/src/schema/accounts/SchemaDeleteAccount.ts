export interface DeleteAccountHeaders {
  'content-type': string;
  'origin': string;
};

export interface DeleteAccountParams {
  id: string;
}

export interface DeleteAccountReply200 {
  status: string;
  message: string;
  id: string;
  role: string;
};

export interface DeleteAccountReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route Delete /auth/internal/admin/account/
 * @HammerCyclone
 */
const schemaDeleteAccount = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      properties: {
        status:     { type: 'string' },
        message:     { type: 'string' },
        id:         { type: 'string' },
        role:       { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
      },
      required: ['status', 'message','id', 'role'],
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

export default schemaDeleteAccount;