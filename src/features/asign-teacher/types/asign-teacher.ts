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

interface ISubject {
  id: string;
  name: string;
  subjectCode: string;
  credit: number;
  semesterId: string;
}

interface IAsignTeacher {
  department: {
    type: string;
  };
  batch: {
    name: string;
  };
  lectures: {
    subject: ISubject;
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

interface IAsigned {
  id: string;
  teacherId: string;
  departmentId: string;
  batchId: string;
  semesterId: string;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAsignWithBatch extends IAsigned {
  batch: {
    id: string;
    name: string;
  };
  semester: {
    id: string;
    semNo: string;
  };
}

export interface IAsignBatchesRes extends IApiRes {
  batches: IAsignWithBatch[];
}

export interface IAsignedRes extends IApiRes {
  asigned: IAsigned;
}

interface IAsignedSubjectDetails extends IAsigned {
  subject: {
    id: string;
    name: string;
  };
}

export interface IAsignedSubjectsRes extends IApiRes {
  asignSubjects: IAsignedSubjectDetails[];
}

export interface IRemoveAsignSubjectRes extends IApiRes {
  removedSubject: IAsigned;
}
