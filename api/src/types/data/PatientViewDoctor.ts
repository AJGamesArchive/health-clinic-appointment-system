/**
 * Type to define the full data object of a Doctor user
 */
type PatientViewDoctor = {
  specialty: string;
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  contactInfo: {
    workEmail: string;
    workPhone: string;
  };
};

export default PatientViewDoctor;