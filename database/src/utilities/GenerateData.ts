import { Faker, base, en, en_GB } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import Tomato from "../classes/Tomato.js";
import AccountData from "../types/data/AccountData.js";
import AppointmentData from "../types/data/AppointmentData.js";
import PatientData from "../types/data/PatientData.js";
import DoctorData from "../types/data/DoctorData.js";
import AccountRoles from "../types/data/AccountRoles.js";
import AdminData from "../types/data/AdminData.js";
import MedicalHistoryData, { MedicalHistoryDetails } from "../types/data/MedicalHistoryData.js";

/**
 * Faker instance for generating random data
 */
const fakerEN = new Faker({
  locale: [
    en_GB,
    base,
    en
  ],
});

/**
 * Function to generate mock patient data
 * @returns The generated patient data
 * @AJGamesArchive
 */
function generatePatientData(): PatientData {
  /**
   * Function to pass a given value or null randomly
   * @param value Value is pass
   * @returns The given value or null
   */
  const randomOrNull = <T>(value: T): T | null => (fakerEN.datatype.boolean() ? value : null);

  // Generate and return random data
  return {
    gender: fakerEN.person.sex(),
    dateOfBirth: fakerEN.date.birthdate(),
    contactInfo: {
      email: fakerEN.internet.email(),
      phone: fakerEN.phone.number(),
    },
    emergencyContact: [
      {
        name: fakerEN.person.fullName(),
        phone: fakerEN.phone.number(),
        relationship: fakerEN.helpers.arrayElement(["Parent", "Sibling", "Friend"]),
      },
    ],
    address: {
      addressLine1: fakerEN.location.streetAddress(),
      addressLine2: fakerEN.location.secondaryAddress(),
      city: fakerEN.location.city(),
      county: fakerEN.location.state(),
      postCode: fakerEN.location.zipCode(),
    },
    upcomingAppointments: [],
    medicalInformation: {
      bloodType: fakerEN.helpers.arrayElement(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
      sexAtBirth: fakerEN.person.sex(),
      conditions: fakerEN.helpers.arrayElements(["Diabetes", "Hypertension", "Asthma"], 2),
      allergies: fakerEN.helpers.arrayElements(["Peanuts", "Dust", "Pollen"], 2),
    },
    lifeStyleHistory: {
      smokingStatus: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        status: fakerEN.helpers.arrayElement(["Non-smoker", "Smoker", "Former smoker"]),
        statusAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      alcoholConsumption: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        consumption: fakerEN.helpers.arrayElement(["None", "Occasional", "Frequent"]),
        consumptionAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      recreationalDrugUse: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        drug: fakerEN.helpers.arrayElement(["Cannabis", "Cocaine", "None"]),
        usage: fakerEN.helpers.arrayElement(["Occasional", "Frequent"]),
        useAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      exerciseFrequency: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        exercise: fakerEN.helpers.arrayElement(["Running", "Swimming", "Gym"]),
        frequency: fakerEN.helpers.arrayElement(["Daily", "Weekly", "Rarely"]),
        frequencyAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      sleepQuality: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        quality: fakerEN.helpers.arrayElement(["Good", "Average", "Poor"]),
        qualityAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      stressLevel: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 10, max: 50 }) }, () => ({
        level: fakerEN.helpers.arrayElement(["Moderate", "High", "Very High", "Heart Attack"]),
        levelAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      socialSupport: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        support: fakerEN.helpers.arrayElement(["Strong", "Moderate", "Weak"]),
        supportAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
      travelHistory: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        location: fakerEN.location.city(),
        date: fakerEN.date.past(),
        duration: `${fakerEN.number.int({ min: 1, max: 30 })} days`,
        notes: fakerEN.lorem.sentence(),
      }))),
      familyConditionals: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        condition: fakerEN.helpers.arrayElement(["Diabetes", "Heart Disease", "Cancer"]),
        typicalCause: fakerEN.lorem.word(),
        typicalAgeOfDiagnosis: fakerEN.number.int({ min: 30, max: 70 }),
        notes: fakerEN.lorem.sentence(),
      }))),
      environmentalFactors: randomOrNull(Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => ({
        factor: fakerEN.helpers.arrayElement(["Air Pollution", "Noise", "Water Quality"]),
        exposure: fakerEN.helpers.arrayElement(["High", "Moderate", "Low"]),
        exposureAsOf: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      }))),
    },
    importantNotes: fakerEN.helpers.arrayElements(["Requires wheelchair access", "Prefers morning appointments"], 2),
  };
};

/**
 * Function to generate mock doctor data
 * @returns The generated doctor data
 * @AJGamesArchive
 */
function generateDoctorData(): DoctorData {
  return {
    specialty: fakerEN.helpers.arrayElement(["Cardiology", "Dermatology", "Pediatrics", "Gynecologist"]),
    upcomingAppointments: [],
    workingHours: Array.from({ length: 5 }, () => ({
      day: fakerEN.date.weekday(),
      startTime: fakerEN.date.recent({ days: 30 }).toLocaleTimeString(),
      endTime: fakerEN.date.soon({ days: 30 }).toLocaleTimeString(),
    })),
    contactInfo: {
      workEmail: fakerEN.internet.email(),
      workPhone: fakerEN.phone.number(),
    },
  };
};

/**
 * Function to generate mock admin data
 * @returns The generated admin data
 * @AJGamesArchive
 */
function generateAdminData(): AdminData {
  return {
    staffRole: fakerEN.helpers.arrayElement([
      "Receptionist",
      "Manager",
      "IT Support",
      "Janitorial",
      "Security",
      "Billing",
      "HR",
      "Marketing",
      "Legal",
      "Compliance",
      "Quality Assurance",
      "Training",
      "Research",
      "Public Relations",
      "Facilities",
      "Procurement",
      "Supply Chain",
      "Data Entry",
      "Customer Service",
      "Social Media",
      "Content Creation",
      "Event Planning",
      "Community Outreach",
      "Patient Advocacy",
      "Telehealth Coordination",
      "Health Informatics",
      "Clinical Research",
      "EHR Management",
      "Patient Education",
      "Health Coaching",
      "Wellness Program Management",
      "Pharmacy Coordination",
      "Laboratory Management",
      "Radiology Coordination",
      "Surgical Coordination",
      "Emergency Management",
      "Infection Control",
      "Patient Safety",
      "Risk Management",
    ]),
  };
};

/**
 * Function to generate mock account data for a given role
 * @param role The role of the account
 * @returns The generated account data
 * @AJGamesArchive
 */
function generateAccount(role: AccountRoles): AccountData {
  // Build base account
  const baseAccount: AccountData = {
    id: uuid(),
    title: fakerEN.helpers.arrayElement(["Mr", "Mrs", "Ms", "Dr"]),
    forenames: fakerEN.person.firstName(),
    surname: fakerEN.person.lastName(),
    email: fakerEN.internet.email(),
    password: 'password',
    role,
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  };

  // Build role-specific data
  switch(role) {
    case "Patient":
      return { ...baseAccount, patientData: generatePatientData() };
    case "Doctor":
      return { ...baseAccount, doctorData: generateDoctorData() };
    case "Admin":
      return { ...baseAccount, adminData: generateAdminData() };
    default:
      throw new Tomato("Unsupported role");
  };
};

/**
 * Function to generate mock appointment data for a given patient and doctor
 * @param doctorId The ID of the doctor
 * @param patientId The ID of the patient
 * @returns The generated appointment data
 * @AJGamesArchive
 */
function generateAppointment(doctorId: string, patientId: string): AppointmentData {
  return {
    id: uuid(),
    doctorId,
    patientId,
    upcoming: fakerEN.datatype.boolean(0.65),
    canceled: fakerEN.datatype.boolean(0.1),
    date: fakerEN.date.future().toISOString().split("T")[0],
    time: fakerEN.date.future().toISOString().split("T")[1],
    bookedBy: fakerEN.helpers.arrayElement(["Admin", "Doctor", "Patient"]),
    bookedAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
    vitals: {
      height: `${fakerEN.number.int({ min: 150, max: 200 })} cm`,
      weight: `${fakerEN.number.int({ min: 50, max: 100 })} kg`,
      bloodPressure: `${fakerEN.number.int({ min: 90, max: 140 })}/${fakerEN.number.int({ min: 60, max: 90 })}`,
      heartRate: `${fakerEN.number.int({ min: 60, max: 100 })} bpm`,
      temperature: `${fakerEN.number.int({ min: 36, max: 38 }).toFixed(1)} °C`,
    },
    preAppointmentNotes: fakerEN.lorem.sentences(),
    actionsTaken: fakerEN.lorem.sentences(),
    previousAppointmentId: undefined,
    nextAppointmentId: undefined,
    postAppointmentNotes: fakerEN.lorem.sentences(),
  };
};

/**
 * Function to generate mock medical history details data
 * @returns The generated medical history details data
 * @AJGamesArchive
 */
function generateMedicalHistoryDetails(): MedicalHistoryDetails {
  // Generate random type
  const type = fakerEN.helpers.arrayElement([
    "LabTestResults",
    "Diagnoses",
    "DietaryRestrictions",
    "Allergies",
    "ChronicConditions",
    "PastSurgeries",
    "Vaccines",
    "Medications",
    "Treatments",
    "Referrals"
  ]);

  // Generate random data based on type
  switch(type) {
    case "LabTestResults":
      return {
        type,
        testName: fakerEN.lorem.word(),
        result: fakerEN.lorem.word(),
        resultsDate: fakerEN.date.past(),
        requestedBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
      } as MedicalHistoryDetails;
    case "Diagnoses":
      return {
        type,
        condition: fakerEN.lorem.word(),
        notes: fakerEN.lorem.sentence(),
        severity: fakerEN.helpers.arrayElement(["Mild", "Moderate", "Severe", "Wild"]),
        date: fakerEN.date.past(),
        diagnosedBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
      } as MedicalHistoryDetails;
    case "DietaryRestrictions":
      return {
        type,
        restriction: fakerEN.lorem.word(),
        notes: fakerEN.lorem.sentence(),
        date: fakerEN.date.past(),
        prescribedBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
      } as MedicalHistoryDetails;
    case "Allergies":
      return {
        type,
        allergen: fakerEN.lorem.word(),
        reaction: fakerEN.lorem.sentence(),
        severity: fakerEN.helpers.arrayElement(["Mild", "Moderate", "Severe"]),
        notes: fakerEN.lorem.sentence(),
        date: fakerEN.date.past(),
      } as MedicalHistoryDetails;
    case "ChronicConditions":
      return {
        type,
        condition: fakerEN.lorem.word(),
        dateDiagnosed: fakerEN.date.past(),
        severity: fakerEN.helpers.arrayElement(["Mild", "Moderate", "Severe"]),
        notes: fakerEN.lorem.sentence(),
        diagnosedBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
      } as MedicalHistoryDetails;
    case "PastSurgeries":
      return {
        type,
        surgery: fakerEN.lorem.word(),
        emergency: fakerEN.datatype.boolean(0.5),
        date: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
        performedBy: Array.from({ length: 2 }, () => ({
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        })),
      } as MedicalHistoryDetails;
    case "Vaccines":
      return {
        type,
        vaccine: fakerEN.lorem.word(),
        dateAdministered: fakerEN.date.past(),
        notes: fakerEN.lorem.sentence(),
      } as MedicalHistoryDetails;
    case "Medications":
      return {
        type,
        medication: fakerEN.lorem.word(),
        dosage: `${fakerEN.number.int({ min: 1, max: 500 })} mg`,
        frequency: fakerEN.helpers.arrayElement(["Once daily", "Twice daily", "Weekly"]),
        startDate: fakerEN.date.past(),
        endDate: fakerEN.datatype.boolean(0.5) ? fakerEN.date.future() : null,
        prescribedBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
        prescribedDate: fakerEN.date.past(),
        refills: fakerEN.number.int({ min: 0, max: 5 }),
        notes: fakerEN.lorem.sentence(),
      } as MedicalHistoryDetails;
    case "Treatments":
      return {
        type,
        treatment: fakerEN.lorem.word(),
        schedule: {
          dateAdministered: fakerEN.date.past(),
          endDate: fakerEN.date.future(),
        },
        administeredBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
        dosage: `${fakerEN.number.int({ min: 1, max: 500 })} mg`,
        reason: fakerEN.lorem.sentence(),
        notes: fakerEN.lorem.sentence(),
      } as MedicalHistoryDetails;
    case "Referrals":
      return {
        type,
        referralTo: fakerEN.company.name(),
        dateReferred: fakerEN.date.past(),
        reason: fakerEN.lorem.sentence(),
        referredBy: {
          doctorId: uuid(),
          doctorName: fakerEN.person.fullName(),
        },
        status: fakerEN.helpers.arrayElement(["Pending", "Completed", "Declined"]),
        followUpDate: fakerEN.datatype.boolean(0.5) ? fakerEN.date.future() : undefined,
        followUpNotes: fakerEN.datatype.boolean(0.5) ? fakerEN.lorem.sentence() : undefined,
        followUpBy: fakerEN.datatype.boolean(0.5)
          ? {
              doctorId: uuid(),
              doctorName: fakerEN.person.fullName(),
            }
          : undefined,
        notes: fakerEN.lorem.sentence(),
      } as MedicalHistoryDetails;
    default:
      throw new Tomato("Unsupported medical history type");
  };
};

/**
 * Function to generate mock medical history data for a given patient and doctor
 * @param patient.id The ID of the patient
 * @param patient.name The name of the patient
 * @param doctor.id The ID of the doctor
 * @param doctor.name The name of the doctor
 * @returns The generated medical history data
 * @AJGamesArchive
 */
function generateMedicalHistory(
  patient: {
    id: string,
    name: string
  },
  doctor: {
    id: string,
    name: string
  }
): MedicalHistoryData {
  return {
    id: uuid(),
    patient: {
      patientId: patient.id,
      patientName: patient.name,
    },
    entryBy: {
      doctorId: doctor.id,
      doctorName: doctor.name,
    },
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
    details: Array.from({ length: fakerEN.number.int({ min: 1, max: 20 }) }, () => generateMedicalHistoryDetails()),
  };
}

/**
 * Function to manage mock data generation
 * @param patientCount The number of patients to generate
 * @param doctorCount The number of doctors to generate
 * @param adminCount The number of admins to generate
 * @param appointmentCount The number of appointments to generate
 * @param medicalHistoryCount The number of medical history entries to generate
 * @returns The generated mock data
 * @AJGamesArchive
 */
async function generateMockData(counts: {
  patientCount: number,
  doctorCount: number,
  adminCount: number,
  appointmentCount: number,
  medicalHistoryCount: number,
}): Promise<{
  patients: AccountData[];
  doctors: AccountData[];
  admins: AccountData[];
  appointments: AppointmentData[];
  medicalHistories: MedicalHistoryData[];
}> {
  // Generate accounts
  const patients: AccountData[] = Array.from({ length: counts.patientCount }, () => generateAccount("Patient"));
  const doctors: AccountData[] = Array.from({ length: counts.doctorCount }, () => generateAccount("Doctor"));
  const admins: AccountData[] = Array.from({ length: counts.adminCount }, () => generateAccount("Admin"));

  // Generate appointments
  const appointments: AppointmentData[] = Array.from({ length: counts.appointmentCount }, () => {
    const doctor = fakerEN.helpers.arrayElement(doctors);
    const patient = fakerEN.helpers.arrayElement(patients);
    return generateAppointment(doctor.id!, patient.id!);
  });

  // Generate medical history
  const medicalHistories: MedicalHistoryData[] = Array.from({ length: counts.medicalHistoryCount }, () => {
    const doctor = fakerEN.helpers.arrayElement(doctors);
    const patient = fakerEN.helpers.arrayElement(patients);
    if(!doctor.id) throw new Tomato("Doctor ID not found");
    if(!patient.id) throw new Tomato("Patient ID not found");
    return generateMedicalHistory({
      id: patient.id,
      name: `${patient.forenames} ${patient.surname}`,
    }, {
      id: doctor.id,
      name: `${doctor.forenames} ${doctor.surname}`,
    });
  });

  // Set previous and next appointment references
  appointments.forEach((appointment, index) => {
    if(index === 0) return;
    appointment.previousAppointmentId = appointments[index - 1].id ?? undefined;
    appointments[index - 1].nextAppointmentId = appointment.id ?? undefined;
  });

  // Hash all passwords
  const saltRounds = 10;
  for(const patient of patients) {
    if(!patient.password) throw new Tomato("Password not found");
    patient.password = await bcrypt.hash(patient.password, saltRounds);
  }
  for(const doctor of doctors) {
    if(!doctor.password) throw new Tomato("Password not found");
    doctor.password = await bcrypt.hash(doctor.password, saltRounds);
  }
  for(const admin of admins) {
    if(!admin.password) throw new Tomato("Password not found");
    admin.password = await bcrypt.hash(admin.password, saltRounds);
  };

  // Return data
  return { patients, doctors, admins, appointments, medicalHistories };
};

export default generateMockData;
