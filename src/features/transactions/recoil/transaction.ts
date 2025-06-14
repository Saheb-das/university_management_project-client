// external import
import { atom } from "recoil";

// types import
import { ITransaction, TransWithSalaryOrFee } from "../types/transaction";

export const myAllTransactionAtom = atom<TransWithSalaryOrFee[]>({
  key: "myAllTransactionAtom",
  default: [],
});

export const allTransactionsAtom = atom<ITransaction[]>({
  key: "allTransactionsAtom",
  default: [],
});
