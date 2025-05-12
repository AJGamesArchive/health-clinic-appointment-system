export interface APIRootReply {
  api: string;
  version: string;
  authors: {
    name: string;
    email: string;
    website?: string;
  }[];
};

/**
 * @summery API Endpoint Schema
 * @route GET /
 * @AJGamesArchive
 */
const schemaAPIRoot = {
  response: {
    200: {
      type: 'object',
      properties: {
        api: { type: 'string' },
        version: { type: 'string' },
        authors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              website: { type: 'string' },
            },
            required: ['name', 'email'],
          },
        },
      },
      required: ['api', 'version', 'authors'],
    },
  },
};

export default schemaAPIRoot;