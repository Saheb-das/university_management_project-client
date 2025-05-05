type TRole =
  | "admin"
  | "examceller"
  | "counsellor"
  | "accountant"
  | "student"
  | "teacher"
  | "superadmin";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TRole; //  only 'superadmin' is allowed
  address: string;
  phoneNo: string;
  adhaarNo: string;
  highestDegree: string;
  specializedIn: string;
  accountNo: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
}

interface Collage {
  name: string;
  address: string;
  registrationNo: string;
  established: string;
}

interface CollageBankDetails {
  accountNo: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
}

export interface IRegisterClient {
  user: User;
  collage: Collage;
  collageBankDetails: CollageBankDetails;
}

export interface ILoginClient {
  role: TRole;
  email: string;
  password: string;
}
