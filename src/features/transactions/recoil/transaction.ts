import { atom } from "recoil";
import { TransWithSalaryOrFee } from "../types/transaction";

export const myAllTransactionAtom = atom<TransWithSalaryOrFee[]>({
  key: "myAllTransactionAtom",
  default: [],
});
