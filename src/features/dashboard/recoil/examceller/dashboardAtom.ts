// external import
import { atom } from "recoil";

// internal import
import { IStudentForRollReg } from "../../types/examceller";

export const studentsListForRollRegAtom = atom<IStudentForRollReg[]>({
  key: "studentsListForRollRegAtom",
  default: [],
});
