import { TStuff } from "@/features/profile/types/profile";
import { TActiveStatus } from "@/recoil/types/user";

export type Role =
  | "examceller"
  | "counsellor"
  | "accountant"
  | "teacher"
  | "student";

export type TStuffRole =
  | "admin"
  | "superadmin"
  | "counsellor"
  | "examceller"
  | "accountant"
  | "teacher";

interface IApiRes {
  success: boolean;
  message: string;
}

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TStuffRole;
  activeStatus: TActiveStatus;
  collageId: string;
}

export interface IUsersRes extends IApiRes {
  users: IUser[];
}

export interface IStuffRes extends IApiRes {
  user: IUser;
}

interface IProfileWithStuff {
  id: string;
  address: string;
  phoneNo: string;
  aadharNo: string;
  avatar?: string;
  userId: string;
  stuff: TStuff;

  createdAt: string;
  updatedAt: string;
}

export interface IUserProfile extends IUser {
  profile: IProfileWithStuff;
}

export interface IStuffUsersRes extends IApiRes {
  user: IUserProfile;
}
