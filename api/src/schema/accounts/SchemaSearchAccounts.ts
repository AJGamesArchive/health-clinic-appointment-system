export interface SearchAccountsHeaders {
  'content-type'?: string;
  'origin': string;
};
export interface SearchAccountsParams {
  type: 'Patient' | 'Doctor' | 'Admin';
};
export interface SearchAccountsQuerystring {
  surname?: string;
  forenames?: string;
  email?: string;
};
export interface SearchAccountsReply200 {
  id: string;
  title: string;
  forenames: string;
  surname: string;
};
export interface SearchAccountsReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route GET /auth/internal/accounts/:type/search
 * @AJGamesArchive
 */
const schemaSearchAccounts = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: [
      'origin',
    ],
  },
  params: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
    },
    required: ['type'],
  },
  querystring: {
    type: 'object',
    properties: {
      surname: { type: 'string' },
      forenames: { type: 'string' },
      email: { type: 'string' },
    },
    minProperties: 1,
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          forenames: { type: 'string' },
          surname: { type: 'string' },
        },
        required: ['id', 'title', 'forenames', 'surname'],
      },
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      additionalProperties: true,
      required: ['error', 'message'],
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      additionalProperties: true,
      required: ['error', 'message'],
    },
  },
};

export default schemaSearchAccounts;