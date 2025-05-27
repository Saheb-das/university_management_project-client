interface IApiRes {
  success: boolean;
  message: string;
}

export interface IAdmission {
  id: string;
  commission: string;
  inYear: number;
  studentId: string;
  counsellorId: string;
  departmentId: string;
  degreeId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  student: {
    profile: {
      user: {
        firstName: string;
        lastName: string;
      };
    };
  };
  degree: {
    type: string;
    id: string;
  };
  department: {
    type: string;
    id: string;
  };
  course: {
    id: string;
    name: string;
  };
}

export interface IAdmissionRes extends IApiRes {
  admission: IAdmission;
}

export interface IAdmissionsRes extends IApiRes {
  admissions: IAdmission[];
}

export type TBatchBody = {
  addmissionYear: string;
  degreeId: string;
  degreeType: string;
  departmentId: string;
  courseName: string;
  courseId: string;
};

export interface IBatch {
  id: string;
  name: string;
  batchYear: number;
  departmentId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBatchRes extends IApiRes {
  batch: IBatch;
}

export interface IBatchesRes extends IApiRes {
  batches: IBatch[];
}
