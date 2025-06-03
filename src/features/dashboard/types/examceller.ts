interface IApiRes {
  success: boolean;
  message: string;
}

export interface IStudentForRollReg {
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
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  department: {
    id: string;
    type: string;
  };
  course: {
    id: string;
    name: string;
    degree: {
      id: string;
      type: string;
    };
  };
}

export interface IIdentifierBody {
  rollNo: string;
  regNo: string;
}

export interface IStudentsForRollRegRes extends IApiRes {
  students: IStudentForRollReg[];
}
