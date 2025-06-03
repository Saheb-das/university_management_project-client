interface IApiRes {
  success: boolean;
  message: string;
}

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

export interface IStudentsByBatchIdRes extends IApiRes {
  students: IStudent[];
}

export interface ISubject {
  id: string;
  name: string;
  subjectCode: string;
  credit: number;
  semesterId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISemester {
  id: string;
  semNo: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExam {
  id: string;
  type: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExamsByCourseRes extends IApiRes {
  exams: IExam[];
}

interface ISubjectMarks {
  id: string;
  name: string;
  marks: number;
}

export interface IResultBody {
  studentId: string;
  semesterId: string;
  examId: string;
  subjects: ISubjectMarks[];
}

interface IResult {
  id: string;
  marks: number;
  batchId: string;
  studentId: string;
  semesterId: string;
  subjectId: string;
  examId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResultByStudentExamSemRes extends IApiRes {
  results: IResult[];
}

export interface ICreateResultsRes extends IApiRes {
  results: IResult[];
}
