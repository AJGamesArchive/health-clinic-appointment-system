export interface GetAccountsHeaders {
  'content-type': string;
  'origin': string;
};
export interface GetAccountsQuerystring {
  page?: number;
  type?: string;
  onlyIds?: boolean;
};
export interface GetAccountsReply200 {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  data?: object;
};
export interface GetAccountsReply {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route GET /accounts
 * @AJGamesArchive
 */
const schemaGetAccounts = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      type: { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
      onlyIds: { type: 'boolean' },
    },
    required: [],
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
          email: { type: 'string' },
          role: { type: 'string', enum: ['Patient', 'Doctor', 'Admin'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          data: {
            type: 'object',
            additionalProperties: true,
          },
        },
        required: [
          'id',
          'title',
          'forenames',
          'surname',
        ],
      },
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

export default schemaGetAccounts;