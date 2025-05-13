export interface InternalCookieHeaders {
  authorization: string;
  'content-type': string;
  'origin': string;
};
export interface InternalCookieReply200 {
  message: string;
};
export interface InternalCookieReplyError {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route POST /token/internal/cookie
 * @AJGamesArchive
 */
const schemaInternalCookie = {
  headers: {
    type: 'object',
    properties: {
      'authorization': { type: 'string' },
      'content-type': { type: 'string', const: 'application/x-www-form-urlencoded' },
      'origin': { type: 'string' },
    },
    required: ['authorization', 'content-type', 'origin'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
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
    },
  },
};

export default schemaInternalCookie;