import { TRole } from "@/zod/auth";

interface IApiRes {
  success: boolean;
  message: string;
}

export type TAsignTeacherBody = {
  subject: string;
  semester: string;
  batchName: string;
};

interface IAsignTeacher {
  department: {
    type: string;
  };
  batch: {
    name: string;
  };
  lectures: {
    subject: string;
  }[];
  semester: {
    semNo: number;
  };
}

export interface IAsignTeacherUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TRole;
  password: string;
  activeStatus: string;
  collageId: string;
  profile: {
    stuff: {
      id: string;
      highestDegree: string;
      asignTeachers: IAsignTeacher[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAsignTeacherUsersRes extends IApiRes {
  teachers: IAsignTeacherUser[];
}
