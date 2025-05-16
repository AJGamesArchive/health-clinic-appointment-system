// Imports
import AccountRoles from "./AccountRoles";

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

export default JWTAccountData;