export interface InternalLogoutHeaders {
  'content-type': string;
  'origin': string;
};
export interface InternalLogoutReply200 {
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route DELETE /token/internal/cookie/logout
 * @AJGamesArchive
 */
const schemaInternalLogout = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', const: 'application/x-www-form-urlencoded' },
      'origin': { type: 'string' },
    },
    required: ['content-type', 'origin'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export default schemaInternalLogout;