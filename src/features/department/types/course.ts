import { TSubject } from "./subject";

interface IApiRes {
  success: boolean;
  message: string;
}

type Semester = {
  id: string;
  semNo: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  subjects: TSubject[];
};

export type TCourseSubjects = {
  id: string;
  name: string;
  duration: number;
  courseFees: string;
  numberOfSem: number;
  degreeId: string;
  createdAt: string;
  updatedAt: string;
  semesters: Semester[];
};

export interface ICourseSubjectsRes extends IApiRes {
  courseSubjects: TCourseSubjects;
}

export type TSemester = {
  id: string;
  semNo: number;
  courseId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

interface ICourse {
  id: string;
  name: string;
  duration: number;
  courseFees: string;
  numberOfSem: number;
  degreeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExamBody {
  course: string;
  examTypes: string[];
}

export type TCourseClient = {
  degree: string;
  name: string;
  duration: string;
  semesters: string;
  totalFees: string;
};

export interface ICourseRes extends IApiRes {
  course: ICourse;
}

export interface ICourseWithSems extends ICourse {
  semesters: TSemester[];
}

export interface ICourseWithSemsRes extends IApiRes {
  courses: ICourseWithSems[];
}

export interface IExam {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  courseId: string;
}

export interface ICreateExamsRes extends IApiRes {
  exams: IExam[];
}
