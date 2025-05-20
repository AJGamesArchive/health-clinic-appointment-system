// Imports
import AccountRoles from "./AccountRoles.js";
import PatientData from "./PatientData.js";
import DoctorData from "./DoctorData.js";
import AdminData from "./AdminData.js";

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

/**
 * Type to define the account data passed to a JWT access token
 */
type JWTAccountData = {
  id: string;
  title: string;
  forenames: string;
  surname: string;
  email: string;
  role: AccountRoles;
};

export default AccountData;
export { JWTAccountData };