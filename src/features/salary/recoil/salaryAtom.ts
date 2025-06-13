// external import
import { atom } from "recoil";

// types import
import { TTranRes, TTransRes } from "@/types/transaction";
import { TransWithSalaryOrFee } from "@/features/transactions/types/transaction";

export const salariesTransAtom = atom<TransWithSalaryOrFee[]>({
  key: "salariesTransAtom",
  default: [],
});

export const salaryTransAtom = atom<TTranRes | null>({
  key: "salaryTransAtom",
  default: null,
});
