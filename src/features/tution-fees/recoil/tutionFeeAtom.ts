import { atom } from "recoil";
import { ICourse, IFeeTransaction } from "../types/tutionFee";
import { TransWithSalaryOrFee } from "@/features/transactions/types/transaction";

export const courseInfoAtom = atom<ICourse>({
  key: "courseInfoAtom",
  default: {} as ICourse,
});

export const tutionFeeTransationByStudentAtom = atom<IFeeTransaction>({
  key: "tutionFeeTransationByStudentAtom",
  default: {} as IFeeTransaction,
});

export const recieptTransactionDetailsAtom = atom<TransWithSalaryOrFee>({
  key: "recieptTransactionDetailsAtom",
  default: {} as TransWithSalaryOrFee,
});
