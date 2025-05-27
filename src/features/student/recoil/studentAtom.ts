import { atom } from "recoil";
import { IStudent } from "../types/student";

export const studentsListAtom = atom<IStudent[]>({
  key: "studentsListAtom",
  default: [],
});

export const studentDetailsAtom = atom({
  key: "studentDetailsAtom",
  default: undefined,
});
