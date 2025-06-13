import { atom } from "recoil";
import { ICourse, IFeeTransaction } from "../types/tutionFee";

export const courseInfoAtom = atom<ICourse>({
  key: "courseInfoAtom",
  default: {} as ICourse,
});

export const tutionFeeTransationByStudentAtom = atom<IFeeTransaction>({
  key: "tutionFeeTransationByStudentAtom",
  default: {} as IFeeTransaction,
});
