// Imports
import AccountRoles from "../../types/data/AccountRoles.js";

export interface DecodeCookieHeaders {
  'content-type': string;
  'origin': string;
};
export interface DecodeCookieReply {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  role: AccountRoles;
};

/**
 * @summery API Endpoint Schema
 * @route GET /auth/internal/session/current/user
 * @AJGamesArchive
 */
const schemaDecodeCookie = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', const: 'application/json' },
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
        role: {
          type: 'string',
          enum: [
            'Patient',
            'Doctor',
            'Admin',
          ],
        },
      },
      required: [
        'id',
        'title',
        'forenames',
        'surname',
        'email',
        'role'
      ],
    },
  },
};

export default schemaDecodeCookie;