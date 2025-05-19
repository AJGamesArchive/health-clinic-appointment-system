import PatientData from "../../types/data/PatientData";
//import MedicalHistoryDetails from "../../types/data/MedicalHistory";

//Make interfaces based on the objects defined earlier
export interface GetPatientHeaders {
  'content-type': string;
  'origin': string;
};
export interface GetPatientParams {
  id: string;
};

export interface GetPatientReply200 {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  data: PatientData;
};

export interface GetPatientReply206 {
  title: string;
  forenames: string;
  surname: string;
  data: PatientData
};

export interface GetPatientReply {
  error: string;
  message: string;
};

/**
 * @summary API Endpoint Schema
 * @route GET /auth/internal/doctor/patient/:id
 * @HammerCyclone
 */
const schemaGetPatient = {
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
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        forenames: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string', enum: ['Patient', 'Admin'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        data: {
          type: 'object',
          properties: {
            gender: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            contactInfo: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                phone: { type: 'string' },
              },
              required: ['email', 'phone'],
            },
            emergencyContact: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  relationship: { type: 'string' },
                },
                required: ['name', 'phone', 'relationship'],
              },
            },
            address: {
              type: 'object',
              properties: {
                addressLine1: { type: 'string' },
                addressLine2: { type: 'string' },
                city: { type: 'string' },
                county: { type: 'string' },
                postCode: { type: 'string' },
              },
              required: ['addressLine1', 'city', 'county', 'postCode'],
            },
            upcomingAppointments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  appointmentId: { type: 'string' },
                  date: { type: 'string' },
                  time: { type: 'string' },
                  doctorId: { type: 'string' },
                  doctorName: { type: 'string' },
                },
                required: ['appointmentId', 'date', 'time', 'doctorId', 'doctorName'],
              },
            },
            medicalInformation: {
              type: 'object',
              properties: {
                bloodType: { type: 'string' },
                sexAtBirth: { type: 'string' },
                conditions: {
                  type: 'array',
                  items: { type: 'string' },
                },
                allergies: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
              required: ['bloodType', 'sexAtBirth', 'conditions', 'allergies'],
            },
            lifeStyleHistory: {
              type: 'object',
              properties: {
                smokingStatus: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      statusAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['status', 'statusAsOf', 'notes'],
                  },
                },
                alcoholConsumption: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      consumption: { type: 'string' },
                      consumptionAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['consumption', 'consumptionAsOf', 'notes'],
                  },
                },
                recreationalDrugUse: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      drug: { type: 'string' },
                      usage: { type: 'string' },
                      useAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['drug', 'usage', 'useAsOf', 'notes'],
                  },
                },
                exerciseFrequency: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exercise: { type: 'string' },
                      frequency: { type: 'string' },
                      frequencyAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['exercise', 'frequency', 'frequencyAsOf', 'notes'],
                  },
                },
                sleepQuality: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      quality: { type: 'string' },
                      qualityAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['quality', 'qualityAsOf', 'notes'],
                  },
                },
                stressLevel: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      level: { type: 'string' },
                      levelAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['level', 'levelAsOf', 'notes'],
                  },
                },
                socialSupport: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      support: { type: 'string' },
                      supportAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['support', 'supportAsOf', 'notes'],
                  },
                },
                travelHistory: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      location: { type: 'string' },
                      date: { type: 'string', format: 'date' },
                      duration: { type: 'string' },
                      notes: { type: 'string' },
                    },
                    required: ['location', 'date', 'duration', 'notes'],
                  },
                },
                familyConditionals: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      condition: { type: 'string' },
                      typicalCause: { type: 'string' },
                      typicalAgeOfDiagnosis: { type: 'number' },
                      notes: { type: 'string' },
                    },
                    required: ['condition', 'typicalCause', 'typicalAgeOfDiagnosis', 'notes'],
                  },
                },
                environmentalFactors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      factor: { type: 'string' },
                      exposure: { type: 'string' },
                      exposureAsOf: { type: 'string', format: 'date' },
                      notes: { type: 'string' },
                    },
                    required: ['factor', 'exposure', 'exposureAsOf', 'notes'],
                  },
                },
              },

            },
            importantNotes: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: [
            'gender',
            'dateOfBirth',
            'contactInfo',
            'emergencyContact',
            'address',
            'upcomingAppointments',
            'medicalInformation',
            'lifeStyleHistory',
            'importantNotes',
          ],
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
    206: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        forenames: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        data: {
          type: 'object',
          properties: {
            gender: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            contactInfo: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                phone: { type: 'string' },
              },
              required: ['email', 'phone'],
            },
            emergencyContact: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  relationship: { type: 'string' },
                },
                required: ['name', 'phone', 'relationship'],
              },
            },
            address: {
              type: 'object',
              properties: {
                addressLine1: { type: 'string' },
                addressLine2: { type: 'string' },
                city: { type: 'string' },
                county: { type: 'string' },
                postCode: { type: 'string' },
              },
              required: ['addressLine1', 'city', 'county', 'postCode'],
            },
            upcomingAppointments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  appointmentId: { type: 'string' },
                  date: { type: 'string' },
                  time: { type: 'string' },
                  doctorId: { type: 'string' },
                  doctorName: { type: 'string' },
                },
                required: ['appointmentId', 'date', 'time', 'doctorId', 'doctorName'],
              },
            },
            medicalInformation: {
              type: 'object',
              properties: {
                bloodType: { type: 'string' },
                sexAtBirth: { type: 'string' },
                conditions: {
                  type: 'array',
                  items: { type: 'string' },
                },
                allergies: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
              required: ['bloodType', 'sexAtBirth', 'conditions', 'allergies'],
            },
            lifeStyleHistory: {
              type: 'object',
              description: 'Defined in LifeStyleFactors type',
            },
            importantNotes: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: [
            'gender',
            'dateOfBirth',
            'contactInfo',
            'emergencyContact',
            'address',
            'upcomingAppointments',
            'medicalInformation',
            'lifeStyleHistory',
            'importantNotes',
          ],
        },
      },
      required: [
        'title',
        'forenames',
        'surname',
        'email',
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
    },
  },
};

export default schemaGetPatient;