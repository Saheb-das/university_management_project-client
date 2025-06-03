// external import
import { atom } from "recoil";

// types import
import { IExam, IStudent, ISubject } from "../types/result";

export const studentsListByBatchAtom = atom<IStudent[]>({
  key: "studentsListByBatchAtom",
  default: [],
});

export const subjectsBySemesterAtom = atom<ISubject[]>({
  key: "subjectsBySemesterAtom",
  default: [],
});

export const examsByCourseIdAtom = atom<IExam[]>({
  key: "examsByCourseIdAtom",
  default: [],
});
