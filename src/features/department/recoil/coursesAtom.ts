import { atom } from "recoil";
import { ICourseWithSems, TCourseSubjects } from "../types/course";

export const coursesWithSemestersAtom = atom<ICourseWithSems[]>({
  key: "coursesWithSemestersAtom",
  default: [],
});

export const courseSubjectsAtom = atom<TCourseSubjects>({
  key: "courseSubjectsAtom",
  default: undefined,
});
