
//Make interfaces based on the objects defined earlier
export interface GetProfileHeaders {
  'content-type': string;
  'origin': string;
};
export interface GetProfileReply200 {
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

export interface GetProfileReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route GET /auth/internal/profile
 * @HammerCyclone
 */
const schemaGetProfile = {
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
        'email',
        'role',
        'createdAt',
        'updatedAt',
        'data',
      ],
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

export default schemaGetProfile;