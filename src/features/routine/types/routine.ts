interface IApiRes {
  success: boolean;
  message: string;
}

export type TDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface ILecture {
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface IBatch {
  id: string;
  name: string;
  batchYear: number;
  departmentId: string;
  courseId: string;
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

export interface ISchedule {
  day: TDay;
  break: string;
  lectures: ILecture[];
}

interface IBatchWithSem extends IBatch {
  course: {
    semesters: ISemester[];
  };
}

interface IRoutine {
  id: string;
  semesterId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRoutineBody {
  batchId: string;
  semesterId: string;
  schedules: ISchedule[];
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

export interface ISubjectsRes extends IApiRes {
  subjects: ISubject[];
}

export interface IBatchesRes extends IApiRes {
  batches: IBatch[];
}

export interface IBatchWithSemRes extends IApiRes {
  batchSemDetails: IBatchWithSem;
}

export interface IRoutineRes extends IApiRes {
  routine: IRoutine;
}

export interface IGetLecture {
  id: string;
  startTime: string;
  endTime: string;
  room: string;
  scheduleId: string;
  subjectId: string;
  asignTeacherId: string | null;
  createdAt: string;
  updatedAt: string;
  subject: {
    name: string;
  };
}

export interface IGetSchedule {
  id: string;
  break: string;
  day: string;
  routineId: string;
  createdAt: string;
  updatedAt: string;
  lectures: IGetLecture[];
}

interface IGetRoutine {
  id: string;
  semesterId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
  schedules: IGetSchedule[];
}

export interface IRoutineByBatchAndSemRes extends IApiRes {
  routine: IGetRoutine;
}
