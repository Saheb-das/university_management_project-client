import { IUser } from "@/features/stuff/types/stuff";

interface IApiRes {
  success: boolean;
  message: string;
}

interface ICurrentSem {
  id: string;
  studentId: string;
  batchId: string;
  semesterId: string;
}

interface ICurSemIncSemNo extends ICurrentSem {
  semester: {
    semNo: number;
  };
}

export interface IStudentWithAcademicDetails {
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
  profile: {
    user: IUser;
  };
  department: {
    type: string;
  };
  batch: {
    name: string;
  };
  course: {
    name: string;
  };
  currentSemester: ICurSemIncSemNo[];
}

export interface IProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  type: string;
  date: Date;
  projectUrl: string;
  avatat: string | null;
}

export interface IMyProjectsRes extends IApiRes {
  projects: IProject[];
}

export interface IStudentWithAcademicDetailsRes extends IApiRes {
  student: IStudentWithAcademicDetails;
}
