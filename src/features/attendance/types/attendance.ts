interface IApiRes {
  success: boolean;
  message: string;
}

interface IAttendance {
  id: string;
  sessionDate: Date;
  status: string;
  studentId: string;
  semesterId: string;
  subjectId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAttendanceQuery {
  semester: string;
  subject: string;
  batch: string;
}

export interface IAttendancesBody {
  [key: string]: boolean;
}

export interface ICreateAttendancesRes extends IApiRes {
  newAttendances: IAttendance[];
}
