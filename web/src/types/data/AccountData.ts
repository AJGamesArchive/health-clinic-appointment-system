// Imports
import AccountRoles from "./AccountRoles";
import PatientData from "./PatientData";
import DoctorData from "./DoctorData";
import AdminData from "./AdminData";

/**
 * Type to define a data object of account data
 */
type AccountData = {
  id: string | null;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  password: string | null;
  role: AccountRoles;
  createdAt?: Date;
  updatedAt?: Date;
  patientData?: PatientData;
  doctorData?: DoctorData;
  adminData?: AdminData;
};

export default AccountData;