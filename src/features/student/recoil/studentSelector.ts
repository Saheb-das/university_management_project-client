// external import
import { selectorFamily } from "recoil";

// internal import
import { studentsListAtom } from "./studentAtom";
import { IStudent } from "../types/student";

export const getStudentByIdSelector = selectorFamily({
  key: "getStudentByIdSelector",
  get:
    (id: string) =>
    ({ get }) => {
      const rawStudents: IStudent[] = get(studentsListAtom);
      return rawStudents.find((student) => student.id === id);
    },
});
