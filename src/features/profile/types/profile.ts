import { TActiveStatus } from "@/recoil/types/user";
import { TRole } from "@/zod/auth";

export type TStuffRoles = Exclude<TRole, "student">;

interface IApiRes {
  message: string;
  success: boolean;
}

export interface IUserProfileRes extends IApiRes {
  user: TUser;
}

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TRole;
  password: string;
  activeStatus: TActiveStatus;

  profile: TProfile;

  createdAt: string;
  updatedAt: string;
};

type TProfile = {
  id: string;
  address: string;
  phoneNo: string;
  aadharNo: string;
  avatar?: string;
  userId: string;

  stuff?: TStuff;
  student?: TStudent;

  createdAt: string;
  updatedAt: string;
};

type TStuff = {
  id: string;
  highestDegree: string;
  specializedIn: string;
  bankAccountId: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
};

type TStudent = {
  id: string;
  dob: string;
  guardianName: string;
  relWithGuardian: string;
  gradeAtHigherSec: string;
  gradeAtSec: string;
  admissionYear: string;
  rollNo: string | null;
  registretionNo: string;
  profileId: string;
  departmentId: string;
  courseId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
};

export type TBaseProfile = {
  firstName: string;
  lastName: string;
  email: string;
  activeStatus: string;
  address: string;
  phoneNo: string;
  aadharNo: string;
  avatar?: string;
};

export type TStudentProfile = TBaseProfile & {
  role: "student"; // discriminator
  dob: string;
  guardianName: string;
  relWithGuardian: string;
  gradeAtHigherSec: string;
  gradeAtSec: string;
  admissionYear: string;
  rollNo: string;
  registretionNo: string;
};

export type TStuffProfile = TBaseProfile & {
  role: TStuffRoles;
  highestDegree: string;
  specializedIn: string;
};
