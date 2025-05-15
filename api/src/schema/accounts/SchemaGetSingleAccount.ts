
//Make interfaces based on the objects defined earlier
export interface GetSingleAccountHeaders {
  'content-type': string;
  'origin': string;
};
export interface GetSingleAccountQuerystring {
  page?: number;
  type?: string;
  onlyIds?: boolean;
};
export interface GetSingleAccountReply200 {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  data: object;
};
export interface GetSingleAccountReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route GET /account
 * @HammerCyclone
 */

//Define what should be expected to be returned for the API
const schemaGetSingleAccount = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['content-type', 'origin'],
  },

  //Querystrings are variable inputs in the URL that are taken after ?
  //Enums are used to strictly type and contain what are the only options
  querystring: {
    type: 'object',
    properties: {
      includeMedHistory: { type: 'boolean' },
    },
    required: [],
  },

    params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },


//Define what's being returned in the respone
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
          'surname',
          'email',
          'role',
          'createdAt',
          'updatedAt',
          'data',
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

export default schemaGetSingleAccount;