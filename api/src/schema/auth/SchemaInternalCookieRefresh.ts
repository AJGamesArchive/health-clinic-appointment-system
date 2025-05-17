export interface InternalCookieRefreshHeaders {
  'content-type': string;
  'origin': string;
};
export interface InternalCookieRefreshReply200 {
  message: string;
};
export interface InternalCookieRefreshReply401 {
  error: string;
  message: string;
};

/**
 * @summery API Endpoint Schema
 * @route POST /token/internal/cookie/refresh
 * @AJGamesArchive
 */
const schemaInternalCookieRefresh = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', const: 'application/x-www-form-urlencoded' },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  response: {
    205: {
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
  },
};

export default schemaInternalCookieRefresh;