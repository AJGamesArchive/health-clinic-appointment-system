import PatientData from "../../types/data/PatientData";

export interface PatchPatientHeaders {
  'content-type': string;
  'origin': string;
};

export interface PatchPatientParams {
  id: string;
};

export interface PatchPatientBody extends Partial <PatientData>{};

export interface PatchPatientReply200 {
  status:     string;
  message:    string;
  id:         string;
  updatedAt:  Date;
};

export interface PatchPatientReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route PATCH /auth/internal/admin/patient/:id
 * @HammerCyclone
 */
const schemaPatchPatient = {
  headers: {
    type: 'object',
    properties: {
      'content-type': { type: 'string', enum: ['application/json'] },
      'origin': { type: 'string' },
    },
    required: ['origin'],
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    additionalProperties: false, 
    properties: {
      gender:        { type: 'string' },
      dateOfBirth:   { type: 'string', format: 'date' },
      contactInfo: {                       
        type: 'object',
        additionalProperties: false,
        properties: {
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
        },
      },
      emergencyContact: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name:         { type: 'string' },
            phone:        { type: 'string' },
            relationship: { type: 'string' },
          },
        },
      },
      address: {
        type: 'object',
        additionalProperties: false,
        properties: {
          addressLine1: { type: 'string' },
          addressLine2: { type: 'string' },
          city:         { type: 'string' },
          county:       { type: 'string' },
          postCode:     { type: 'string' },
        },
      },
      medicalInformation: {
        type: 'object',
        additionalProperties: false,
        properties: {
          bloodType:   { type: 'string' },
          sexAtBirth:  { type: 'string' },
          conditions:  {
            type:  'array',
            items: { type: 'string' },
          },
          allergies:   {
            type:  'array',
            items: { type: 'string' },
          },
        },
      },
      lifeStyleHistory: {
        type: 'object',
        additionalProperties: false,
        properties: {
          smokingStatus: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                status:       { type: 'string' },
                statusAsOf:   { type: 'string', format: 'date' },
                notes:        { type: 'string' },
              },
            },
          },

          alcoholConsumption: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                consumption:     { type: 'string' },
                consumptionAsOf: { type: 'string', format: 'date' },
                notes:           { type: 'string' },
              },
            },
          },

          recreationalDrugUse: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                drug:     { type: 'string' },
                usage:    { type: 'string' },
                useAsOf:  { type: 'string', format: 'date' },
                notes:    { type: 'string' },
              },
            },
          },

          exerciseFrequency: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                exercise:        { type: 'string' },
                frequency:       { type: 'string' },
                frequencyAsOf:   { type: 'string', format: 'date' },
                notes:           { type: 'string' },
              },
            },
          },

          sleepQuality: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                quality:     { type: 'string' },
                qualityAsOf: { type: 'string', format: 'date' },
                notes:       { type: 'string' },
              },
            },
          },

          stressLevel: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                level:     { type: 'string' },
                levelAsOf: { type: 'string', format: 'date' },
                notes:     { type: 'string' },
              },
            },
          },

          socialSupport: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                support:     { type: 'string' },
                supportAsOf: { type: 'string', format: 'date' },
                notes:       { type: 'string' },
              },
            },
          },

          travelHistory: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                location:  { type: 'string' },
                date:      { type: 'string', format: 'date' },
                duration:  { type: 'string' },
                notes:     { type: 'string' },
              },
            },
          },

          familyConditionals: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                condition:             { type: 'string' },
                typicalCause:          { type: 'string' },
                typicalAgeOfDiagnosis: { type: 'number' },
                notes:                 { type: 'string' },
              },
            },
          },
          environmentalFactors: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                factor:       { type: 'string' },
                exposure:     { type: 'string' },
                exposureAsOf: { type: 'string', format: 'date' },
                notes:        { type: 'string' },
              },
            },
          },
        },
      },
    },
    minProperties: 1,        
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id:         { type: 'string' },
        updatedAt:  { type: 'string', format: 'date-time' },
      },
      required: ['id', 'role', 'updatedAt'],
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

export default schemaPatchPatient;