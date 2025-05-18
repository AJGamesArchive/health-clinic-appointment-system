// Import
import mongoose from "mongoose";

/**
 * Medical History Details Schema
 */
const medicalHistoryDetailsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'LabTestResults',
      'Diagnoses',
      'DietaryRestrictions',
      'Allergies',
      'ChronicConditions',
      'PastSurgeries',
      'Vaccines',
      'Medications',
      'Treatments',
      'Referrals',
    ],
  },
}, {
  discriminatorKey: 'type',
  _id: false,
});

/**
 * Lab Test Results Schema
 */
const labTestResults = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  resultsDate: {
    type: Date,
    required: true
  },
  requestedBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      }
    }, { _id: false }),
    required: true,
  },
}, { _id: false });

/**
 * Diagnoses Schema
 */
const diagnoses = new mongoose.Schema({
  condition: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  diagnosedBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
    }, { _id: false }),
    required: true,
  },
}, { _id: false });

/**
 * Dietary Restrictions Schema
 */
const dietaryRestrictions = new mongoose.Schema({
  restriction: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  prescribedBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
    }, { _id: false }),
    required: true,
  }
}, { _id: false });

/**
 * Allergies Schema
 */
const allergies = new mongoose.Schema({
  allergen: {
    type: String,
    required: true
  },
  reaction: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
}, { _id: false });

/**
 * Chronic Conditions Schema
 */
const chronicConditions = new mongoose.Schema({
  condition: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  dateDiagnosed: {
    type: Date,
    required: true
  },
  diagnosedBy: new mongoose.Schema({
    doctorId: {
      type: String,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
  }, { _id: false }),
}, { _id: false });

/**
 * Past Surgeries Schema
 */
const pastSurgeries = new mongoose.Schema({
  surgery: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  performedBy: {
    type: [
      new mongoose.Schema({
        doctorId: {
          type: String,
          required: true
        },
        doctorName: {
          type: String,
          required: true
        },
      }, { _id: false }),
    ],
    required: true,
  },
  emergency: {
    type: Boolean,
    required: true
  },
}, { _id: false });

/**
 * Vaccines Schema
 */
const vaccines = new mongoose.Schema({
  vaccine: {
    type: String,
    required: true
  },
  dateAdministered: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
}, { _id: false });

/**
 * Medications Schema
 */
const medication = new mongoose.Schema({
  medication: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false,
    default: null,
  },
  prescribedBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
    }, { _id: false }),
    required: true,
  },
  notes: {
    type: String,
    required: true
  },
  prescribedDate: {
    type: Date,
    required: true
  },
  refills: {
    type: Number,
    required: true
  },
}, { _id: false });

/**
 * Treatments Schema
 */
const treatments = new mongoose.Schema({
  treatment: {
    type: String,
    required: true
  },
  schedule: {
    type: new mongoose.Schema({
      dateAdministered: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
    }, { _id: false }),
    required: true,
  },
  notes: {
    type: String,
    required: true
  },
  administeredBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
    }, { _id: false }),
    required: true,
  },
  reason: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
}, { _id: false });

/**
 * Referrals Schema
 */
const referrals = new mongoose.Schema({
  referralTo: {
    type: String,
    required: true
  },
  dateReferred: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  referredBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: true
      },
      doctorName: {
        type: String,
        required: true
      },
    }, { _id: false }),
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Declined']
  },
  followUpDate: {
    type: Date,
    required: false
  },
  followUpNotes: {
    type: String,
    required: false
  },
  followUpBy: {
    type: new mongoose.Schema({
      doctorId: {
        type: String,
        required: false
      },
      doctorName: {
        type: String,
        required: false
      },
    }, { _id: false }),
    required: false,
  },
}, { _id: false });

/**
 * Medical History schema
 */
const medicalHistorySchema = new mongoose.Schema({
  patient: new mongoose.Schema({
    patientId: {
      type: String,
      required: true
    },
    patientName: {
      type: String,
      required: true
    },
  }),
  entryBy: new mongoose.Schema({
    doctorId: {
      type: String,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
  }, { _id: false }),
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  details: {
    type: [medicalHistoryDetailsSchema],
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

/**
 * Register medical history details array schemas
 */
const detailsPath = medicalHistorySchema.path('details') as mongoose.Schema.Types.DocumentArray;
detailsPath.discriminator("LabTestResults", labTestResults);
detailsPath.discriminator("Diagnoses", diagnoses);
detailsPath.discriminator("DietaryRestrictions", dietaryRestrictions);
detailsPath.discriminator("Allergies", allergies);
detailsPath.discriminator("ChronicConditions", chronicConditions);
detailsPath.discriminator("PastSurgeries", pastSurgeries);
detailsPath.discriminator("Vaccines", vaccines);
detailsPath.discriminator("Medications", medication);
detailsPath.discriminator("Treatments", treatments);
detailsPath.discriminator("Referrals", referrals);

/**
 * Medical History model
 */
const DB_MedicalHistory = mongoose.model('medicalHistory', medicalHistorySchema);
export default DB_MedicalHistory;
