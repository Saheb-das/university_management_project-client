import { atom } from "recoil";
import { ICourse } from "../types/tutionFee";

export const courseInfoAtom = atom<ICourse>({
  key: "courseInfoAtom",
  default: {} as ICourse,
});
