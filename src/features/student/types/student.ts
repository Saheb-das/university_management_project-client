import { TRole } from "@/zod/auth";

interface IApiRes {
  success: boolean;
  message: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TRole;
  password: string;
  activeStatus: string;
  collageId: string;
  createdAt: string;
  updatedAt: string;
}

interface IProfile {
  user: IUser;
}

export type TStatus = "regular" | "suspend" | "blocked";

export interface IStudent {
  id: string;
  dob: string;
  guardianName: string;
  relWithGuardian: string;
  gradeAtHigherSec: string;
  gradeAtSec: string;
  admissionYear: string;
  rollNo: string | null;
  registretionNo: string | null;
  profileId: string;
  departmentId: string;
  courseId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
  profile: IProfile;
}

export interface IStudentsRes extends IApiRes {
  students: IStudent[];
}

export interface IStudentRes extends IApiRes {
  student: IStudent;
}
